// ReSharper disable CheckNamespace

using System.Text.Json.Nodes;

namespace LearnJsonEverything;

public interface ILessonRunner<out T>
{
	T Run(JsonObject context);
}
