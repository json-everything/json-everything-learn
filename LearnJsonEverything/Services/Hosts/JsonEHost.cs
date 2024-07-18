using System.Text.Json.Nodes;
using Json.More;

namespace LearnJsonEverything.Services.Hosts;

public class JsonEHost : ILessonHost
{
	public string[] Run(LessonData lesson)
	{
		var (runner, errors) = CompilationHelpers.GetRunner<JsonNode?>(lesson);

		if (runner is null) return errors;

		var results = new List<string>();

		var correct = true;
		foreach (var test in lesson.Tests)
		{
			var expectedResult = test!["result"];
			JsonNode? result = null;
			// need to capture this first because some of the lessons add functions, which don't print so well.
			var printedTest = test.Print();
			try
			{
				result = runner.Run(test.AsObject());
			}
			catch
			{
				// ignore
			}

			var localResult = expectedResult.IsEquivalentTo(result);
			correct &= localResult;
			results.Add($"{(localResult ? Iconography.SuccessIcon : Iconography.ErrorIcon)} {printedTest}");
		}

		lesson.Achieved |= correct;

		return [.. results];
	}
}