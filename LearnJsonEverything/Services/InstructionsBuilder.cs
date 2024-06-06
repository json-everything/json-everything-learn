using System.Text.Json;
using System.Text.Json.Nodes;
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
        var tests = testData.Deserialize(SerializerContext.Default.SchemaTestArray)!;
        string[] lines =
        [
            "| Instance | Is Valid |",
            "|:-|:-:|",
            .. tests.Select(test => $"|`{test.Instance.AsJsonString()}`|{test.IsValid}|")
        ];

        return string.Join(Environment.NewLine, lines);
    }
}