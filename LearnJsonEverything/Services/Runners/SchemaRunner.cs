using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Nodes;
using Json.More;
using Json.Schema;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;

using static LearnJsonEverything.Services.SerializationHelpers;

namespace LearnJsonEverything.Services.Runners;

public static class SchemaRunner
{
	public class SchemaTest
	{
		public JsonNode? Instance { get; set; }
		public bool IsValid { get; set; }
	}

	private const string Instructions =
		$"""
		 ### /* TITLE */

		 /* INSTRUCTIONS */

		 ### Code template

		 ```csharp
		 /* CONTEXT CODE */
		 ```

		 ### Tests
		 /* TESTS */
		 
		 """;

	public static string BuildInstructions(LessonData lesson) => Instructions
		.Replace("/* TITLE */", lesson.Title)
		.Replace("/* INSTRUCTIONS */", lesson.Instructions)
		.Replace("/* CONTEXT CODE */", lesson.ContextCode)
		.Replace("/* TESTS */", BuildTestList(lesson.Tests));

	private static string BuildTestList(JsonArray testData)
	{
		var tests = testData.Deserialize(SerializerContext.Default.SchemaTestArray)!;
		string[] lines =
		[
			"| Instance | Is Valid |",
			"|:-|:-:|",
			.. tests.Select(test => $"|`{test.Instance.AsJsonString()}`|{test.IsValid}|")
		];

		return string.Join(Environment.NewLine, lines);
	}

	[RequiresUnreferencedCode("")]
	public static string[] Run(string userCode, LessonData lesson)
	{
		var (runner, errors) = CompilationHelpers.GetRunner<EvaluationResults>(lesson, userCode);

		if (runner is null) return errors;

		var tests = lesson.Tests.Deserialize(SerializerContext.Default.SchemaTestArray)!;
		var results = new List<string>();

		foreach (var test in tests)
		{
			var result = runner.Run(new JsonObject { ["instance"] = test.Instance });
			results.Add($"{(test.IsValid == result.IsValid ? Iconography.SuccessIcon : Iconography.ErrorIcon)} {test.Instance.AsJsonString()}");
		}

		// run the code

		return [.. results];
	}
}