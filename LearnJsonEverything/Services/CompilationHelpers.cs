using Json.Schema.Generation.XmlComments;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using System.Runtime.Loader;
using static LearnJsonEverything.Services.Iconography;

namespace LearnJsonEverything.Services;

public static class CompilationHelpers
{
	private static AssemblyLoadContext? _assemblyLoadContext;
	private static MetadataReference[]? _references;
	private static bool _isLoading;

	private static readonly string[] EnsuredAssemblies =
	[
		"Json.More",
		"JsonE.Net",
		"JsonPath.Net",
		"JsonPointer.Net",
		"JsonSchema.Net",
		"JsonSchema.Net.Generation",
		"LearnJsonEverything.Template",
		//"Yaml2JsonNode",
	];

	public static void TestOnly_SetReferences(MetadataReference[] references) => _references = references;

	public static async Task<MetadataReference[]?> LoadAssemblyReferences(HttpClient client)
	{
		if (_references is null)
		{
			if (_isLoading) return null;
			_isLoading = true;

			var refs = AppDomain.CurrentDomain.GetAssemblies();
			var names = refs
				.Where(x => !x.IsDynamic)
				.Select(x => x.FullName!.Split(',')[0])
				.Concat(EnsuredAssemblies)
				.Distinct()
				.OrderBy(x => x)
				.ToArray();
			
			var references = new MetadataReference[names.Length];
			int i = 0;
			foreach (var assemblyName in names)
			{
				var source = $"/_framework/{assemblyName}.dll";
				try
				{
					var stream = await client.GetStreamAsync(source);
					Console.WriteLine($"Loading {assemblyName}...");
					references[i] = MetadataReference.CreateFromStream(stream);
					i++;
				}
				catch (Exception e)
				{
					Console.WriteLine(e);
					Console.WriteLine(source);
				}
			}

			_references = references;
			_isLoading = false;
		}

		return _references;
	}

	public static (ILessonRunner<T>?, string[]) GetRunner<T>(LessonData lesson)
	{
		if (_references is null)
			return (null, ["Compilation assemblies still loading.  Please wait until complete and try again."]);

		var fullSource = lesson.UserCode ?? string.Empty;

		Console.WriteLine($"Compiling...\n\n{fullSource}");

		var syntaxTree = CSharpSyntaxTree.ParseText(fullSource, new CSharpParseOptions(LanguageVersion.Latest));
		var assemblyPath = Path.ChangeExtension(Path.GetTempFileName(), "dll");

		var compilation = CSharpCompilation.Create(Path.GetFileName(assemblyPath))
			.WithOptions(new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary))
			.AddReferences(_references)
			.AddSyntaxTrees(syntaxTree);

		using var dllStream = new MemoryStream();
		using var pdbStream = new MemoryStream();
		using var xmlStream = new MemoryStream();
		var emitResult = compilation.Emit(dllStream, pdbStream, xmlStream);
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
		pdbStream.Position = 0;
		xmlStream.Position = 0;

#pragma warning disable IL2026
#pragma warning disable IL2072
#pragma warning disable IL2070
		_assemblyLoadContext?.Unload();
		_assemblyLoadContext = new AssemblyLoadContext(nameof(CompilationHelpers), true);
		var assembly = _assemblyLoadContext.LoadFromStream(dllStream, pdbStream);

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