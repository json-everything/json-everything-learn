using Microsoft.CodeAnalysis;

namespace LearnJsonEverything.Services;

public static class CompilationHelpers
{
	private static MetadataReference[]? _references;

	private static readonly string[] _ensuredAssemblies =
	[
		"Json.More",
		"JsonPointer.Net",
		"JsonSchema.Net",
		"LearnJsonEverything.Template",
	];

	public static async Task<MetadataReference[]> LoadAssemblyReferences(HttpClient client)
	{
		if (_references is null)
		{
			var refs = AppDomain.CurrentDomain.GetAssemblies();
			var names = refs
				.Where(x => !x.IsDynamic)
				.Select(x => x.FullName!.Split(',')[0])
				.Concat(_ensuredAssemblies)
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
		}

		return _references;
	}
}