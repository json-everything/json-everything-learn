using System.Text.Json.Serialization;

namespace LearnJsonEverything.Services;

[JsonConverter(typeof(LessonPlanJsonConverter))]
public class LessonPlan
{
	private readonly LessonData[] _lessonData;
	private readonly Dictionary<Guid, int> _indexLookup;

	public LessonPlan(LessonData[] lessonData)
	{
		_lessonData = lessonData;
		_indexLookup = lessonData.Select((d, i) => (d.Id, i)).ToDictionary(x => x.Id, x => x.i);
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
}