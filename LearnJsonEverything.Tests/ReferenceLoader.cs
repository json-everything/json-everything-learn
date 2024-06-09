using Json.More;
using Json.Path;
using Json.Schema;
using Json.Schema.Generation;
using Microsoft.CodeAnalysis;
using Yaml2JsonNode;

namespace LearnJsonEverything.Tests;

public static class ReferenceLoader
{
	static ReferenceLoader()
	{
		// force some assemblies to load
		Load<ILessonRunner<int>>();
		Load<EnumStringConverter<DayOfWeek>>();
		Load<JsonSchema>();
		Load<MinimumAttribute>();
		Load<JsonPath>();
		_ = YamlSerializer.Parse(string.Empty);
	}

	private static void Load<T>(){}

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