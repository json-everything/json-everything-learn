namespace LearnJsonEverything.Services.Runners;

public interface ILessonHost
{
	string[] Run(LessonData lesson);
}