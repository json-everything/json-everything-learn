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
	private class SchemaTest
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

	private const string SuccessIcon = "✔";
	private const string ErrorIcon = "❌";
	private const string WarnIcon = "⚠";
	private const string MessageIcon = "ⓘ";

	//public static string ErrorIcon = "<span style=\"foreground:red;\">❌</span>";
	//public static string WarnIcon = "<span style=\"foreground:amber;\">⚠</span>";
	//public static string MessageIcon = "<span style=\"foreground:lightblue;\">ⓘ</span>";

	public static string BuildInstructions(LessonData lesson) => Instructions
		.Replace("/* TITLE */", lesson.Title)
		.Replace("/* INSTRUCTIONS */", lesson.Instructions)
		.Replace("/* CONTEXT CODE */", lesson.ContextCode)
		.Replace("/* TESTS */", BuildTestList(lesson.Tests));

	private static string BuildTestList(JsonArray testData)
	{
		var tests = testData.Deserialize<SchemaTest[]>(SerializerOptions);
		var lines = new List<string>
		{
			"| Instance | Is Valid |",
			"|:-|:-:|"
		};

		foreach (var test in tests)
		{
			lines.Add($"|`{test.Instance.AsJsonString()}`|{test.IsValid}|");
		}

		return string.Join(Environment.NewLine, lines);
	}

	public static string[] Run(string userCode, LessonData lesson, MetadataReference[] references)
	{
		var fullSource = lesson.ContextCode
			.Replace("/* USER CODE */", userCode);

		var syntaxTree = CSharpSyntaxTree.ParseText(fullSource);
		var assemblyPath = Path.ChangeExtension(Path.GetTempFileName(), "dll");

		var compilation = CSharpCompilation.Create(Path.GetFileName(assemblyPath))
			.WithOptions(new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary))
			.AddReferences(references)
			.AddSyntaxTrees(syntaxTree);

		using var dllStream = new MemoryStream();
		using var pdbStream = new MemoryStream();
		using var xmlStream = new MemoryStream();
		var emitResult = compilation.Emit(dllStream, pdbStream, xmlStream);
		if (!emitResult.Success)
		{
			var diagnostics = new List<string>();
			foreach (var diagnostic in emitResult.Diagnostics)
			{
				var icon = diagnostic.Severity switch
				{
					DiagnosticSeverity.Info => MessageIcon,
					DiagnosticSeverity.Warning => WarnIcon,
					DiagnosticSeverity.Error => ErrorIcon,
					_ => string.Empty
				};
				diagnostics.Add($"{icon} {diagnostic.GetMessage()}");
			}
			return [.. diagnostics];
		}

		var assembly = Assembly.Load(dllStream.ToArray());

		var type = assembly.DefinedTypes.Single(x => !x.IsInterface && x.ImplementedInterfaces.Contains(typeof(ILessonRunner<EvaluationResults>)));
		var runner = (ILessonRunner<EvaluationResults>) Activator.CreateInstance(type)!;

		var tests = lesson.Tests.Deserialize<SchemaTest[]>(SerializerOptions);
		var results = new List<string>();

		foreach (var test in tests)
		{
			var result = runner.Run(new JsonObject { ["instance"] = test.Instance });
			results.Add($"{(test.IsValid == result.IsValid ? SuccessIcon : ErrorIcon)} {test.Instance.AsJsonString()}");
		}

		// run the code

		return results.ToArray();
	}

	private static string ToLiteral(this string valueTextForCompiler)
	{
		var formatted = SymbolDisplay.FormatLiteral(valueTextForCompiler, true);
		return formatted;
	}
}