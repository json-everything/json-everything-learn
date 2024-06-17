using System.Text.Json;
using LearnJsonEverything.Services;
using LearnJsonEverything.Services.Hosts;

namespace LearnJsonEverything.Tests;

public class ProvidedSolutionTests
{
	private static readonly JsonSerializerOptions SerializerOptions =
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
		var json = File.ReadAllText(filename);
		return JsonSerializer.Deserialize<LessonPlan>(json, SerializerOptions)!;
	}

	public static IEnumerable<TestCaseData> SchemaLessons
	{
		get
		{
			var lessonPlan = LoadLessonPlan("schema.json");
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
		var results = new SchemaHost().Run(lesson);

		foreach (var result in results)
		{
			Console.WriteLine(result);
		}

		foreach (var result in results)
		{
			Assert.That(result, Does.StartWith(Iconography.SuccessIcon));
		}
	}

	public static IEnumerable<TestCaseData> PathLessons
	{
		get
		{
			var lessonPlan = LoadLessonPlan("path.json");
			return lessonPlan.Select(x =>
			{
				x.UserCode = x.Solution;
				return new TestCaseData(x) { TestName = x.Title };
			});
		}
	}

	[TestCaseSource(nameof(PathLessons))]
	public void Path(LessonData lesson)
	{
		var results = new PathHost().Run(lesson);

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