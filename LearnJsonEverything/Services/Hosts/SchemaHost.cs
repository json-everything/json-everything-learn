using System.Text.Json;
using Json.Schema;

namespace LearnJsonEverything.Services.Hosts;

public class SchemaHost : ILessonHost
{
	public string[] Run(LessonData lesson)
	{
		var (runner, errors) = CompilationHelpers.GetRunner<EvaluationResults>(lesson);

		if (runner is null) return errors;

		var results = new List<string>();

		var correct = true;
		foreach (var test in lesson.Tests)
		{
			var expectedValidity = test!["isValid"]!.GetValue<bool>();
			Console.WriteLine($"Running `{test["instance"].Print()}`");
			var result = runner.Run(test.AsObject());
			Console.WriteLine($"Result: {JsonSerializer.Serialize(result, SerializerContext.Default.EvaluationResults)}");
			correct &= expectedValidity == result.IsValid;
			results.Add($"{(expectedValidity == result.IsValid ? Iconography.SuccessIcon : Iconography.ErrorIcon)} {test.Print()}");
		}

		lesson.Achieved |= correct;

		return [.. results];
	}
}