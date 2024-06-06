using System.Text.Json;
using System.Text.Json.Nodes;
using Json.More;
using Json.Schema;

namespace LearnJsonEverything.Services.Runners;

public static class SchemaRunner
{
	public class SchemaTest
	{
		public JsonNode? Instance { get; set; }
		public bool IsValid { get; set; }
	}

	public static string[] Run(LessonData lesson)
	{
		var (runner, errors) = CompilationHelpers.GetRunner<EvaluationResults>(lesson);

		if (runner is null) return errors;

		var tests = lesson.Tests.Deserialize(SerializerContext.Default.SchemaTestArray)!;
		var results = new List<string>();

		var correct = true;
		foreach (var test in tests)
		{
			var result = runner.Run(new JsonObject { ["instance"] = test.Instance });
			correct &= test.IsValid == result.IsValid;
			results.Add($"{(test.IsValid == result.IsValid ? Iconography.SuccessIcon : Iconography.ErrorIcon)} {test.Instance.AsJsonString()}");
		}

		lesson.Achieved |= correct;

		return [.. results];
	}
}