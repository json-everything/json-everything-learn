using System.Text.Json;
using System.Text.Json.Serialization;

namespace LearnJsonEverything.Services;

[JsonConverter(typeof(LessonPlanJsonConverter))]
public class LessonPlan : List<LessonData>
{
	private readonly Dictionary<Guid, int> _indexLookup;

	public LessonData this[Guid id] => this[_indexLookup[id]];

	public LessonPlan(LessonData[] lessonData)
		: base(lessonData)
	{
		_indexLookup = lessonData.Select((d, i) =>
		{
			d.Index = i;
			return (d.Id, i);
		}).ToDictionary(x => x.Id, x => x.i);
	}

	public LessonData? GetPrevious(Guid? id)
	{
		if (id is null) return this[0];

		if (!_indexLookup.TryGetValue(id.Value, out var index)) return null;

		index = Math.Max(0, index - 1);

		return this[index];
	}

	public LessonData? GetNext(Guid? id)
	{
		if (id is null) return this[0];

		if (!_indexLookup.TryGetValue(id.Value, out var index)) return null;

		index = Math.Min(Count - 1, index + 1);

		return this[index];
	}
}

public class LessonPlanJsonConverter : JsonConverter<LessonPlan>
{
	public override LessonPlan? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
#pragma warning disable IL2026 // Members annotated with 'RequiresUnreferencedCodeAttribute' require dynamic access otherwise can break functionality when trimming application code
		var lessonData = JsonSerializer.Deserialize<LessonData[]>(ref reader, options)!;
#pragma warning restore IL2026 // Members annotated with 'RequiresUnreferencedCodeAttribute' require dynamic access otherwise can break functionality when trimming application code

		return new LessonPlan(lessonData.ToArray());
	}

	public override void Write(Utf8JsonWriter writer, LessonPlan value, JsonSerializerOptions options)
	{
		JsonSerializer.Serialize(value.ToArray(), options);
	}
}