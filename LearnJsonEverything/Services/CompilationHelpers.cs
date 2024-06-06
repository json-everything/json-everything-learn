using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using System.Reflection;
using static LearnJsonEverything.Services.Iconography;

namespace LearnJsonEverything.Services;

public static class CompilationHelpers
{
	private static MetadataReference[]? _references;
	private static bool _isLoading;

	private static readonly string[] EnsuredAssemblies =
	[
		"Json.More",
		"JsonPointer.Net",
		"JsonSchema.Net",
		"LearnJsonEverything.Template",
		"Yaml2JsonNode",
	];

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

	public static (ILessonRunner<T>?, string[]) GetRunner<T>(LessonData lesson, string userCode)
	{
		if (_references is null)
			return (null, ["Compilation assemblies still loading.  Please wait until complete and try again."]);

		var fullSource = lesson.ContextCode
			.Replace("/* USER CODE */", userCode);

		Console.WriteLine($"Compiling...\n\n{fullSource}");

		var syntaxTree = CSharpSyntaxTree.ParseText(fullSource);
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

#pragma warning disable IL2026
#pragma warning disable IL2072
#pragma warning disable IL2070
		var assembly = Assembly.Load(dllStream.ToArray());

		var type = assembly.DefinedTypes.Single(x => !x.IsInterface && x.ImplementedInterfaces.Contains(typeof(ILessonRunner<T>)));
		var runner = (ILessonRunner<T>)Activator.CreateInstance(type)!;
#pragma warning restore IL2070
#pragma warning restore IL2072
#pragma warning restore IL2026

		return (runner, []);
	}
}