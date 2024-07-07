using System.Collections.ObjectModel;
using System.Windows;
using Json.More;
using LearnJsonEverything.Services;

namespace LearnJsonEverything.LessonEditor.Controls;

public class LessonModel : DependencyObject
{
	public LessonData Lesson { get; }

	public string Title
	{
		get => (string)GetValue(TitleProperty);
		set => SetValue(TitleProperty, value);
	}

	public static readonly DependencyProperty TitleProperty =
		DependencyProperty.Register(nameof(Title), typeof(string), typeof(LessonModel), new PropertyMetadata(null));

	public bool Skip
	{
		get => (bool)GetValue(SkipProperty);
		set => SetValue(SkipProperty, value);
	}

	public static readonly DependencyProperty SkipProperty =
		DependencyProperty.Register(nameof(Skip), typeof(bool), typeof(LessonModel), new PropertyMetadata(false));

	public string Background
	{
		get => (string)GetValue(BackgroundProperty);
		set => SetValue(BackgroundProperty, value);
	}

	public static readonly DependencyProperty BackgroundProperty =
		DependencyProperty.Register(nameof(Background), typeof(string), typeof(LessonModel), new PropertyMetadata(null));

	public string DocsPath
	{
		get => (string)GetValue(DocsPathProperty);
		set => SetValue(DocsPathProperty, value);
	}

	public static readonly DependencyProperty DocsPathProperty =
		DependencyProperty.Register(nameof(DocsPath), typeof(string), typeof(LessonModel), new PropertyMetadata(null));

	public string Instructions
	{
		get => (string)GetValue(InstructionsProperty);
		set => SetValue(InstructionsProperty, value);
	}

	public static readonly DependencyProperty InstructionsProperty =
		DependencyProperty.Register(nameof(Instructions), typeof(string), typeof(LessonModel), new PropertyMetadata(null));

	public string InitialCode
	{
		get => (string)GetValue(InitialCodeProperty);
		set => SetValue(InitialCodeProperty, value);
	}

	public static readonly DependencyProperty InitialCodeProperty =
		DependencyProperty.Register(nameof(InitialCode), typeof(string), typeof(LessonModel), new PropertyMetadata(null));

	public string Solution
	{
		get => (string)GetValue(SolutionProperty);
		set => SetValue(SolutionProperty, value);
	}

	public static readonly DependencyProperty SolutionProperty =
		DependencyProperty.Register(nameof(Solution), typeof(string), typeof(LessonModel), new PropertyMetadata(null));

	public ObservableCollection<TestModel> Tests
	{
		get => (ObservableCollection<TestModel>)GetValue(TestsProperty);
		set => SetValue(TestsProperty, value);
	}

	public static readonly DependencyProperty TestsProperty =
		DependencyProperty.Register(nameof(Tests), typeof(ObservableCollection<TestModel>), typeof(Editor), new PropertyMetadata(null));

	public TestModel? SelectedTest
	{
		get => (TestModel)GetValue(SelectedTestProperty);
		set => SetValue(SelectedTestProperty, value);
	}

	public static readonly DependencyProperty SelectedTestProperty =
		DependencyProperty.Register(nameof(SelectedTest), typeof(TestModel), typeof(Editor), new PropertyMetadata(null, SelectedTestChanged));

	private static void SelectedTestChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
	{
	}

	public LessonModel(LessonData data)
	{
		Lesson = data;
		Reset();
	}

	public void Reset()
	{
		Title = Lesson.Title;
		Skip = Lesson.Skip;
		Background = Lesson.Background;
		DocsPath = Lesson.Docs;
		Instructions = Lesson.Instructions;
		InitialCode = Lesson.ContextCode;
		Solution = Lesson.Solution;
		Tests = new ObservableCollection<TestModel>(Lesson.Tests?.Select(x => new TestModel(x!.AsObject())) ?? []);
		SelectedTest = Tests.FirstOrDefault();
	}

	public void Save()
	{
		Lesson.Title = Title;
		Lesson.Skip = Skip;
		Lesson.Background = Background;
		Lesson.Docs = DocsPath;
		Lesson.Instructions = Instructions;
		Lesson.ContextCode = InitialCode;
		Lesson.Solution = Solution;
		Lesson.Tests = Tests.Select(x => x.Test).ToJsonArray();
	}
}