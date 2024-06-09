using System.Text.Json;
using LearnJsonEverything.Services;
using LearnJsonEverything.Services.Runners;
using Yaml2JsonNode;

namespace LearnJsonEverything.Tests;

public class ProvidedSolutionTests
{
	private static JsonSerializerOptions SerializerOptions =
		new()
		{
			PropertyNameCaseInsensitive = true
		};

	[OneTimeSetUp]
	public void Setup()
	{
		CompilationHelpers.TestOnly_SetReferences(ReferenceLoader.Load());
	}

	private static LessonPlan LoadLessonPlan(string filename)
	{
		var yamlText = File.ReadAllText(filename);
		var yaml = YamlSerializer.Parse(yamlText);
		var json = yaml.First().ToJsonNode();
		return json.Deserialize<LessonPlan>(SerializerOptions)!;
	}

	public static IEnumerable<TestCaseData> SchemaLessons
	{
		get
		{
			var lessonPlan = LoadLessonPlan("schema.yaml");
			return lessonPlan.Select(x =>
			{
				x.UserCode = x.Solution;
				return new TestCaseData(x) { TestName = x.Title };
			});
		}
	}

	[TestCaseSource(nameof(SchemaLessons))]
	public void Schema(LessonData lesson)
	{
		var results = SchemaRunner.Run(lesson);

		foreach (var result in results)
		{
			Console.WriteLine(result);
		}

		foreach (var result in results)
		{
			Assert.That(result, Does.StartWith(Iconography.SuccessIcon));
		}
	}
}