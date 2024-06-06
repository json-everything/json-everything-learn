using LearnJsonEverything.Services.Runners;
using Microsoft.CodeAnalysis.CSharp;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using Json.Schema;

namespace LearnJsonEverything.Services;

public static class SerializationHelpers
{
	public static string ToLiteral(this string valueTextForCompiler)
	{
		var formatted = SymbolDisplay.FormatLiteral(valueTextForCompiler, true);
		return formatted;
	}
}

[JsonSerializable(typeof(JsonSchema))]
[JsonSerializable(typeof(JsonNode))]
[JsonSerializable(typeof(JsonObject))]
[JsonSerializable(typeof(JsonArray))]
[JsonSerializable(typeof(LessonPlan))]
[JsonSerializable(typeof(LessonData))]
[JsonSerializable(typeof(LessonData[]))]
[JsonSerializable(typeof(SchemaRunner.SchemaTest))]
[JsonSerializable(typeof(SchemaRunner.SchemaTest[]))]
[JsonSourceGenerationOptions(WriteIndented = true, PropertyNameCaseInsensitive = true)]
internal partial class SerializerContext : JsonSerializerContext;