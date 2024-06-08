using System.Collections;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace LearnJsonEverything.Services;

[JsonConverter(typeof(LessonPlanJsonConverter))]
public class LessonPlan : IReadOnlyList<LessonData>
{
	private readonly LessonData[] _lessonData;
	private readonly Dictionary<Guid, int> _indexLookup;

	public LessonData this[int i] => _lessonData[i];
	public LessonData this[Guid id] => _lessonData[_indexLookup[id]];

	public int Count => _lessonData.Length;

	public LessonPlan(LessonData[] lessonData)
	{
		_lessonData = lessonData;
		_indexLookup = lessonData.Select((d, i) =>
		{
			d.Index = i;
			return (d.Id, i);
		}).ToDictionary(x => x.Id, x => x.i);
	}

	public LessonData? GetPrevious(Guid? id)
	{
		if (id is null) return _lessonData[0];

		if (!_indexLookup.TryGetValue(id.Value, out var index)) return null;

		index = Math.Max(0, index - 1);

		return _lessonData[index];
	}

	public LessonData? GetNext(Guid? id)
	{
		if (id is null) return _lessonData[0];

		if (!_indexLookup.TryGetValue(id.Value, out var index)) return null;

		index = Math.Min(_lessonData.Length - 1, index + 1);

		return _lessonData[index];
	}

	public IEnumerator<LessonData> GetEnumerator() => ((IEnumerable<LessonData>)_lessonData).GetEnumerator();

	IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}

public class LessonPlanJsonConverter : JsonConverter<LessonPlan>
{
	public override LessonPlan? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
	{
#pragma warning disable IL2026 // Members annotated with 'RequiresUnreferencedCodeAttribute' require dynamic access otherwise can break functionality when trimming application code
		var lessonData = JsonSerializer.Deserialize<LessonData[]>(ref reader, options)!;
#pragma warning restore IL2026 // Members annotated with 'RequiresUnreferencedCodeAttribute' require dynamic access otherwise can break functionality when trimming application code

		return new LessonPlan(lessonData.Where(x => !x.Skip).ToArray());
	}

	public override void Write(Utf8JsonWriter writer, LessonPlan value, JsonSerializerOptions options)
	{
		throw new NotImplementedException();
	}
}