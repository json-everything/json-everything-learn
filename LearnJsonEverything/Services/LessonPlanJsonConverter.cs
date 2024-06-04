using System.Text.Json;
using System.Text.Json.Serialization;

namespace LearnJsonEverything.Services;

public class LessonPlanJsonConverter : JsonConverter<LessonPlan>
{
	public override LessonPlan? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
		var lessonData = JsonSerializer.Deserialize<LessonData[]>(ref reader, options)!;

		return new LessonPlan(lessonData);
	}

	public override void Write(Utf8JsonWriter writer, LessonPlan value, JsonSerializerOptions options)
	{
		throw new NotImplementedException();
	}
}