using System.Text.Json.Nodes;
using Json.Schema;
using Microsoft.CodeAnalysis;
using Yaml2JsonNode;

namespace LearnJsonEverything.Tests;

public static class ReferenceLoader
{
	private class NullRunner : ILessonRunner<int>
	{
		public int Run(JsonObject context) => 0;
	}

	static ReferenceLoader()
	{
		// force some assemblies to load
		SchemaRegistry.Global.Fetch = null!;
		_ = YamlSerializer.Parse(string.Empty);
		_ = new NullRunner();
	}

	public static MetadataReference[] Load()
	{
		var refs = AppDomain.CurrentDomain.GetAssemblies();
		var assemblies = refs
			.Where(x => !x.IsDynamic)
			.OrderBy(x => x.FullName)
			.ToArray();

		var references = new MetadataReference[assemblies.Length];
		int i = 0;
		foreach (var assembly in assemblies)
		{
			Console.WriteLine($"Loading {assembly.FullName}...");
			references[i] = MetadataReference.CreateFromFile(assembly.Location);
			i++;
		}

		return references;
	}

}