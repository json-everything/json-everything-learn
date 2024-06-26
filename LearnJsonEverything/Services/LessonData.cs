﻿using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

namespace LearnJsonEverything.Services;

public class LessonData
{
	[JsonIgnore]
	public int Index { get; set; }
	public Guid Id { get; set; }
	public bool Skip { get; set; }
	public string Title { get; set; }
	public string Background { get; set; }
	public string Docs { get; set; }
	public string Api { get; set; }
	public string SchemaDocs { get; set; }
	public string Instructions { get; set; }
	public string ContextCode { get; set; }
	public JsonArray Tests { get; set; }
	[JsonIgnore]
	public bool Achieved { get; set; }
	[JsonIgnore]
	public string? UserCode { get; set; }
	public string Solution { get; set; }
}
