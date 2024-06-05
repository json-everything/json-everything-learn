using System.Reflection;
using System.Text.Json;
using Json.Schema;
using LearnJsonEverything.Template;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;

namespace LearnJsonEverything.Services.Runners;

public static class SchemaRunner
{
	private const string ContextCode =
		"""
		using System;
		using System.Collections.Generic;
		using System.Text.Json;
		using System.Text.Json.Nodes;
		using System.Text.Json.Serialization;
		using Json.Schema;
		
		namespace JsonEverythingTemp;
		
		public class Lesson : ILessonRunner<EvaluationResults>
		{
			public EvaluationResults Run()
			{
				var instance = JsonNode.Parse("/* INSTANCE */");
				
				/* USER CODE */
			}
		}
		""";

	private const string Instructions =
		$"""
		 ### /* TITLE */

		 /* INSTRUCTIONS */

		 ### Code template

		 ```csharp
		 {ContextCode}
		 ```
		 """;

	public static string BuildInstructions(LessonData lesson) => Instructions
		.Replace("/* TITLE */", lesson.Title)
		.Replace("/* INSTRUCTIONS */", lesson.Instructions)
		.Replace("/* INSTANCE */", JsonSerializer.Serialize(lesson.Data?["instance"]));

	public static string Run(string userCode, LessonData lesson, MetadataReference[] references)
	{
		var fullSource = ContextCode
			.Replace("/* USER CODE */", userCode)
			.Replace("/* INSTANCE */", JsonSerializer.Serialize(lesson.Data?["instance"]));

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
			Console.WriteLine("You may expect a list of what compilation errors there are, but unfortunately " +
			                  "Roslyn doesn't seem to be giving that information out (or I don't know how to " +
			                  "interpret it).  So instead, here are the errors in raw form.  Good luck.  If you " +
			                  "know what these mean, please drop a line in a GitHub issue.");
			//var errors = string.Join("\n", emitResult.Diagnostics.Where(x => x.Severity == DiagnosticSeverity.Error)
			//	.Select(x => GetErrorDetails(source, x)));
			//await _outputEditor.SetValue(errors);
			return "Compilation error";
		}

		var assembly = Assembly.Load(dllStream.ToArray());

		var type = assembly.DefinedTypes.Single(x => !x.IsInterface && x.ImplementedInterfaces.Contains(typeof(ILessonRunner<EvaluationResults>)));
		var runner = (ILessonRunner<EvaluationResults>) Activator.CreateInstance(type)!;

		var results = runner.Run();
		// run the code

		return JsonSerializer.Serialize(results);
	}
}