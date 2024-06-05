using System.Text.Json.Nodes;

namespace LearnJsonEverything.Services;

public class LessonData
{
	public int Index { get; set; }
	public Guid Id { get; set; }
	public string Title { get; set; }
	public string Instructions { get; set; }
	public string ContextCode { get; set; }
	public JsonArray? Tests { get; set; }
}
