using Json.Logic;
using Json.JsonE;
using Json.More;
using Json.Path;
using Json.Schema;
using Json.Schema.Generation;
using Json.Schema.Generation.XmlComments;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using System.Reflection;
using System.Reflection.Metadata;
using System.Runtime.Loader;
using Microsoft.CodeAnalysis.Emit;
using static LearnJsonEverything.Services.Iconography;

namespace LearnJsonEverything.Services;

public static class CompilationHelpers
{
	private static AssemblyLoadContext? _assemblyLoadContext;
	private static readonly Compilation _baseCompilation = CSharpCompilation.Create("BaseCompilation")
		.WithOptions(new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary))
		.AddReferences(GetAssemblyReferences());

	static CompilationHelpers()
	{
		// force some assemblies to load
		_ = typeof(ILessonRunner<int>);
		_ = typeof(EnumStringConverter<DayOfWeek>);
		_ = typeof(JsonSchema);
		_ = typeof(MinimumAttribute);
		_ = typeof(JsonPath);
		_ = typeof(JsonFunction);
		_ = typeof(Rule);
	}

	private static unsafe MetadataReference? TryCreateReferenceFromRawMetadata(Assembly assembly)
	{
		if (!assembly.TryGetRawMetadata(out var metadataBlob, out var metadataLength))
		{
			return null;
		}
		var metadata = ModuleMetadata.CreateFromMetadata((nint)metadataBlob, metadataLength, () => GC.KeepAlive(assembly));
		var location = assembly.Location;
		if (location == "")
		{
			location = null;
		}
		return AssemblyMetadata.Create(metadata).GetReference(filePath: location, display: assembly.GetName().Name);
	}

	public static IEnumerable<MetadataReference> GetAssemblyReferences() => AppDomain.CurrentDomain.GetAssemblies()
		.Where(assembly => !assembly.IsDynamic)
		.Select(TryCreateReferenceFromRawMetadata)
		.Where(reference => reference is not null)!;

	public static (ILessonRunner<T>?, string[]) GetRunner<T>(LessonData lesson)
	{
		var fullSource = lesson.UserCode ?? string.Empty;

		Console.WriteLine($"Compiling...\n\n{fullSource}");

		var syntaxTree = CSharpSyntaxTree.ParseText(fullSource, new CSharpParseOptions(LanguageVersion.Latest));
		var assemblyPath = Path.ChangeExtension(Path.GetTempFileName(), "dll");

		var compilation = _baseCompilation
			.WithAssemblyName(Path.GetFileName(assemblyPath))
			.AddSyntaxTrees(syntaxTree);

		using var dllStream = new MemoryStream();
		using var pdbStream = new MemoryStream();
		using var xmlStream = new MemoryStream();
		EmitResult emitResult;
		if (OperatingSystem.IsBrowser())
		{
			// Avoid debugger-agent assertions in WASM by not emitting debug symbols.
			emitResult = compilation.Emit(dllStream, xmlDocumentationStream: xmlStream);
		}
		else
		{
			emitResult = compilation.Emit(dllStream, pdbStream, xmlStream);
		}
		if (!emitResult.Success)
		{
			var diagnostics = new List<string>();
			foreach (var diagnostic in emitResult.Diagnostics)
			{
				var icon = diagnostic.Severity switch
				{
					DiagnosticSeverity.Info => MessageIcon,
					DiagnosticSeverity.Warning => WarnIcon,
					DiagnosticSeverity.Error => ErrorIcon,
					_ => string.Empty
				};
				diagnostics.Add($"{icon} {diagnostic.GetMessage()}");
			}
			return (null, [.. diagnostics]);
		}

		dllStream.Position = 0;
		xmlStream.Position = 0;
		if (!OperatingSystem.IsBrowser())
			pdbStream.Position = 0;

#pragma warning disable IL2026
#pragma warning disable IL2072
#pragma warning disable IL2070
		Assembly assembly;
		if (OperatingSystem.IsBrowser())
		{
			assembly = Assembly.Load(dllStream.ToArray());
		}
		else
		{
			_assemblyLoadContext?.Unload();
			_assemblyLoadContext = new AssemblyLoadContext(nameof(CompilationHelpers), true);
			assembly = _assemblyLoadContext.LoadFromStream(dllStream, pdbStream);
		}

		using var reader = new StreamReader(xmlStream);
		var xmlContent = reader.ReadToEnd();
#pragma warning disable CS0618
		DocXmlReader.ExplicitlyAddAssemblyXml(assembly, xmlContent);
#pragma warning restore CS0618


		var type = assembly.DefinedTypes.Single(x => !x.IsInterface && x.ImplementedInterfaces.Contains(typeof(ILessonRunner<T>)));
		var runner = (ILessonRunner<T>)Activator.CreateInstance(type)!;
#pragma warning restore IL2070
#pragma warning restore IL2072
#pragma warning restore IL2026

		return (runner, []);
	}
}