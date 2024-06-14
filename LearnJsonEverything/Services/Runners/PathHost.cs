using Json.More;
using Json.Path;

namespace LearnJsonEverything.Services.Runners;

public class PathHost : ILessonHost
{
	public string[] Run(LessonData lesson)
	{
		var (runner, errors) = CompilationHelpers.GetRunner<PathResult>(lesson);

		if (runner is null) return errors;

		var results = new List<string>();

		var correct = true;
		foreach (var test in lesson.Tests)
		{
			var expectedResult = test!["result"];
			var result = runner.Run(test.AsObject());
			var localResult = expectedResult.IsEquivalentTo(result?.Matches?.Select(x => x.Value).ToJsonArray());
			correct &= localResult;
			results.Add($"{(localResult ? Iconography.SuccessIcon : Iconography.ErrorIcon)} {test["data"]!.Print()}");
		}

		lesson.Achieved |= correct;

		return [.. results];
	}
}