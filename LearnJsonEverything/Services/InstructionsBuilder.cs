using System.Text;
using System.Text.Json.Nodes;
using Humanizer;
using Json.More;

namespace LearnJsonEverything.Services;

public static class InstructionsBuilder
{
    private const string Instructions =
        $"""
		 ### /* TITLE */

		 #### Background

		 /* BACKGROUND */
		 /* REFERENCE */
		 #### Task

		 /* INSTRUCTIONS */

		 #### Code template

		 ```csharp
		 /* CONTEXT CODE */
		 ```

		 #### Tests
		 /* TESTS */

		 """;

    public static string BuildInstructions(LessonData lesson) => Instructions
        .Replace("/* TITLE */", lesson.Title)
        .Replace("/* INSTRUCTIONS */", lesson.Instructions)
        .Replace("/* BACKGROUND */", lesson.Background)
        .Replace("/* REFERENCE */", BuildReferenceLinks(lesson))
        .Replace("/* CONTEXT CODE */", lesson.ContextCode)
        .Replace("/* TESTS */", BuildTestList(lesson.Tests));

    private static string BuildReferenceLinks(LessonData lesson)
    {
        var links = string.Empty;

        if (!string.IsNullOrWhiteSpace(lesson.Docs))
            links += BuildDocsLink(lesson);

        if (!string.IsNullOrWhiteSpace(lesson.Api))
            links += BuildApiLink(lesson);

        //if (!string.IsNullOrWhiteSpace(lesson.SchemaDocs))
        //    links += BuildSchemaLink(lesson);

        if (string.IsNullOrWhiteSpace(links)) return string.Empty;

        return $"\n{links}\n";
    }

    private static string BuildDocsLink(LessonData lesson) =>
        $"[[Documentation](https://docs.json-everything.net/{lesson.Docs})] ";

    private static string BuildApiLink(LessonData lesson) =>
        $"[[API Reference](https://docs.json-everything.net/{lesson.Api})] ";

    //private static string BuildSchemaLink(LessonData lesson) =>
    //    $"[[JSON Schema Reference](https://www.learnjsonschema.com/{lesson.SchemaDocs})] ";

    private static string BuildTestList(JsonArray testData)
    {
		var lines = new List<string>();

		var sample = testData[0]!.AsObject();
		lines.Add($"|{string.Join("|", sample.Select(x => x.Key.Pascalize().Humanize()))}|");
		lines.Add($"|{string.Join("|", sample.Select(_ => ":-"))}|");

		foreach (var test in testData)
		{
			var lineContent = new StringBuilder("|");
			foreach (var kvp in sample)
			{
				lineContent.Append(MaybeCode(test![kvp.Key], kvp.Key));
				lineContent.Append('|');
			}

			lines.Add(lineContent.ToString());
		}

		return string.Join(Environment.NewLine, lines);

		//string[] lines =
  //      [
  //          "| Instance | Is Valid |",
  //          "|:-|:-:|",
  //          .. testData.Select(test => $"|`{test!["instance"]!.Print()}`|{test["isValid"]!.Print()}|")
  //      ];

  //      return string.Join(Environment.NewLine, lines);
    }

    private static readonly string[] KeysToFormat =
    [
	    "instance",
	    "format"
    ];

	private static string MaybeCode(JsonNode? node, string key)
	{
		if (KeysToFormat.Contains(key)) return $"`{node.Print()}`";

		return node?.Print();
	}
}