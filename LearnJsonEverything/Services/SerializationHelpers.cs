using System.Text.Encodings.Web;
using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using Json.More;
using Json.Schema;

namespace LearnJsonEverything.Services;

public static class SerializationHelpers
{
	private static readonly JsonSerializerOptions _writeOptions = 
			new()
			{
				TypeInfoResolverChain = { SerializerContext.Default },
				PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
				Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
			};

	public static string Print(this JsonNode? node) => node.AsJsonString(_writeOptions);

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
[JsonSerializable(typeof(LessonData[]))]
[JsonSerializable(typeof(SchemaSaveData[]))]
[JsonSourceGenerationOptions(WriteIndented = true, PropertyNameCaseInsensitive = true)]
internal partial class SerializerContext : JsonSerializerContext;