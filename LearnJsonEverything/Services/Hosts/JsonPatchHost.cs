using System.Text.Json.Nodes;
using Json.More;

namespace LearnJsonEverything.Services.Hosts;

public class JsonPatchHost : ILessonHost
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
			var printedTest = test.Print();
			try
			{
				result = runner.Run(test.AsObject());
			}
			catch
			{
				// ignored
			}

			var localResult = expectedResult.IsEquivalentTo(result);
			correct &= localResult;
			results.Add($"{(localResult ? Iconography.SuccessIcon : Iconography.ErrorIcon)} {printedTest}");
		}

		lesson.Achieved |= correct;

		return [.. results];
	}
}