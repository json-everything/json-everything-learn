namespace LearnJsonEverything.Template;

public interface ILessonRunner<out T>
{
	T Run();
}
