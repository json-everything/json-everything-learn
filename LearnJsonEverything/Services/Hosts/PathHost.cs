using Json.More;
using Json.Path;

namespace LearnJsonEverything.Services.Hosts;

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
			PathResult? result = null;
			try
			{
				result = runner.Run(test.AsObject());
			}
			catch
			{
				// ignored
			}

			var localResult = expectedResult.IsEquivalentTo(result?.Matches?.Select(x => x.Value).ToJsonArray());
			correct &= localResult;
			results.Add($"{(localResult ? Iconography.SuccessIcon : Iconography.ErrorIcon)} {test.Print()}");
		}

		lesson.Achieved |= correct;

		return [.. results];
	}
}