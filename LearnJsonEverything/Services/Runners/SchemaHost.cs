using Json.Schema;

namespace LearnJsonEverything.Services.Runners;

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
			var result = runner.Run(test.AsObject());
			correct &= expectedValidity == result.IsValid;
			results.Add($"{(expectedValidity == result.IsValid ? Iconography.SuccessIcon : Iconography.ErrorIcon)} {test["instance"]!.Print()}");
		}

		lesson.Achieved |= correct;

		return [.. results];
	}
}