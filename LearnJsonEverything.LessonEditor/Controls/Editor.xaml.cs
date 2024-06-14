using System.Collections.ObjectModel;
using System.IO;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Windows;
using System.Windows.Controls;
using Json.More;
using LearnJsonEverything.Services;
using LearnJsonEverything.Services.Runners;

namespace LearnJsonEverything.LessonEditor.Controls;

/// <summary>
/// Interaction logic for Editor.xaml
/// </summary>
public partial class Editor : UserControl
{
	// I understand that much of this doesn't follow the standard MVVM practice, but this is a quick'n'dirty tool.  I don't care.

	private const string DataFileFolder = @"..\..\..\..\LearnJsonEverything\wwwroot\data\lessons\";

	public Editor()
	{
		InitializeComponent();
	}

	public string FileName	
	{
		get => (string)GetValue(FileNameProperty);
		set => SetValue(FileNameProperty, value);
	}

	public static readonly DependencyProperty FileNameProperty =
		DependencyProperty.Register(nameof(FileName), typeof(string), typeof(Editor), new PropertyMetadata(null, LoadFile));

	private static void LoadFile(DependencyObject d, DependencyPropertyChangedEventArgs e)
	{
		var editor = (Editor)d;

		var fileName = Path.Combine(DataFileFolder, editor.FileName);
		var contents = File.ReadAllText(fileName);
		var lessonPlan = JsonSerializer.Deserialize<LessonPlan>(contents, SerializerSettings.SerializerOptions) ?? new LessonPlan([]);

		if (lessonPlan.Count == 0)
		{
			editor.SelectedLesson = new LessonData();
			lessonPlan.Add(editor.SelectedLesson);
		}
		else
			editor.SelectedLesson = lessonPlan.First();

		editor.Lessons = new ObservableCollection<LessonData>(lessonPlan);
			
		editor.LoadLesson();
	}

	public ObservableCollection<LessonData> Lessons
	{
		get => (ObservableCollection<LessonData>)GetValue(LessonsProperty);
		set => SetValue(LessonsProperty, value);
	}

	public static readonly DependencyProperty LessonsProperty =
		DependencyProperty.Register(nameof(Lessons), typeof(ObservableCollection<LessonData>), typeof(Editor), new PropertyMetadata(null));

	public LessonData? SelectedLesson
	{
		get => (LessonData?)GetValue(SelectedLessonProperty);
		set => SetValue(SelectedLessonProperty, value);
	}

	public static readonly DependencyProperty SelectedLessonProperty =
		DependencyProperty.Register(nameof(SelectedLesson), typeof(LessonData), typeof(Editor), new PropertyMetadata(null, SelectedLessonChanged));

	private static void SelectedLessonChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
	{
		var editor = (Editor)d;
		editor.StageLesson((LessonData)e.OldValue);
		editor.LoadLesson();
	}

	public string LessonTitle
	{
		get => (string)GetValue(LessonTitleProperty);
		set => SetValue(LessonTitleProperty, value);
	}

	public static readonly DependencyProperty LessonTitleProperty =
		DependencyProperty.Register(nameof(LessonTitle), typeof(string), typeof(Editor), new PropertyMetadata(string.Empty));

	public string LessonBackground
	{
		get => (string)GetValue(LessonBackgroundProperty);
		set => SetValue(LessonBackgroundProperty, value);
	}

	public static readonly DependencyProperty LessonBackgroundProperty =
		DependencyProperty.Register(nameof(LessonBackground), typeof(string), typeof(Editor), new PropertyMetadata(string.Empty));

	public string DocsPath
	{
		get => (string)GetValue(DocsPathProperty);
		set => SetValue(DocsPathProperty, value);
	}

	public static readonly DependencyProperty DocsPathProperty =
		DependencyProperty.Register(nameof(DocsPath), typeof(string), typeof(Editor), new PropertyMetadata(string.Empty));

	public string Instructions
	{
		get => (string)GetValue(InstructionsProperty);
		set => SetValue(InstructionsProperty, value);
	}

	public static readonly DependencyProperty InstructionsProperty =
		DependencyProperty.Register(nameof(Instructions), typeof(string), typeof(Editor), new PropertyMetadata(string.Empty));

	public string InitialCode
	{
		get => (string)GetValue(InitialCodeProperty);
		set => SetValue(InitialCodeProperty, value);
	}

	public static readonly DependencyProperty InitialCodeProperty =
		DependencyProperty.Register(nameof(InitialCode), typeof(string), typeof(Editor), new PropertyMetadata(string.Empty));

	public string Solution
	{
		get => (string)GetValue(SolutionProperty);
		set => SetValue(SolutionProperty, value);
	}

	public static readonly DependencyProperty SolutionProperty =
		DependencyProperty.Register(nameof(Solution), typeof(string), typeof(Editor), new PropertyMetadata(string.Empty));

	public bool CanSave
	{
		get => (bool)GetValue(CanSaveProperty);
		set => SetValue(CanSaveProperty, value);
	}

	public static readonly DependencyProperty CanSaveProperty =
		DependencyProperty.Register(nameof(CanSave), typeof(bool), typeof(Editor), new PropertyMetadata(false));

	public ILessonHost LessonHost
	{
		get => (ILessonHost)GetValue(LessonHostProperty);
		set => SetValue(LessonHostProperty, value);
	}

	public static readonly DependencyProperty LessonHostProperty =
		DependencyProperty.Register(nameof(LessonHost), typeof(ILessonHost), typeof(Editor), new PropertyMetadata(null));

	public ObservableCollection<TestModel> Tests
	{
		get => (ObservableCollection<TestModel>)GetValue(TestsProperty);
		set => SetValue(TestsProperty, value);
	}

	public static readonly DependencyProperty TestsProperty =
		DependencyProperty.Register(nameof(Tests), typeof(ObservableCollection<TestModel>), typeof(Editor), new PropertyMetadata(null));

	public TestModel? SelectedTest
	{
		get => (TestModel?)GetValue(SelectedTestProperty);
		set => SetValue(SelectedTestProperty, value);
	}

	public static readonly DependencyProperty SelectedTestProperty =
		DependencyProperty.Register(nameof(SelectedTest), typeof(TestModel), typeof(Editor), new PropertyMetadata(null));

	private void ValidateSolution(object sender, RoutedEventArgs e)
	{
		if (SelectedLesson is null) return;

		SelectedLesson.UserCode = SelectedLesson.Solution;
		var output = LessonHost.Run(SelectedLesson);
		CanSave = output.All(x => x.StartsWith(Iconography.SuccessIcon));
	}

	private void SaveChanges(object sender, RoutedEventArgs e)
	{
		StageLesson(SelectedLesson);

		var content = JsonSerializer.Serialize(Lessons, SerializerSettings.SerializerOptions);
		var fileName = Path.Combine(DataFileFolder, Path.ChangeExtension(FileName, ".json"));
		File.WriteAllText(fileName, content);
		CanSave = false;
	}

	private void ResetContent(object sender, RoutedEventArgs e)
	{
		LoadLesson();
	}

	private void CopyInitialToSolution(object sender, RoutedEventArgs e)
	{
		Solution = InitialCode;
	}

	private void AddLesson(object sender, RoutedEventArgs e)
	{
		var newLesson = new LessonData { Id = Guid.NewGuid() };
		Lessons.Add(newLesson);
		SelectedLesson = newLesson;
		LoadLesson();
	}

	private void RemoveLesson(object sender, RoutedEventArgs e)
	{
		if (SelectedLesson is null) return;

		var index = Lessons.IndexOf(SelectedLesson);
		Lessons.Remove(SelectedLesson);
		if (Lessons.Count != 0)
		{
			index = Math.Clamp(index, 0, Lessons.Count - 1);
			SelectedLesson = Lessons[index];
		}
		else
			SelectedLesson = null!;
	
		LoadLesson();
	}

	private void MoveLessonUp(object sender, RoutedEventArgs e)
	{
		if (SelectedLesson is null) return;

		var lesson = SelectedLesson;
		var index = Lessons.IndexOf(lesson);
		index--;
		Lessons.Remove(lesson);  // this clears SelectedIndex somehow

		index = Math.Clamp(index, 0, Lessons.Count - 1);
		Lessons.Insert(index, lesson);

		SelectedLesson = lesson;
	}

	private void MoveLessonDown(object sender, RoutedEventArgs e)
	{
		if (SelectedLesson is null) return;

		var lesson = SelectedLesson;
		var index = Lessons.IndexOf(lesson);
		index++;
		Lessons.Remove(lesson);

		index = Math.Clamp(index, 0, Lessons.Count);
		Lessons.Insert(index, lesson);

		SelectedLesson = lesson;
	}

	private void StageLesson(LessonData? oldLesson)
	{
		if (oldLesson is null) return;

		oldLesson.Title = LessonTitle;
		oldLesson.Background = LessonBackground;
		oldLesson.Docs = DocsPath;
		oldLesson.Instructions = Instructions;
		oldLesson.ContextCode = InitialCode;
		oldLesson.Solution = Solution;
		oldLesson.Tests = Tests.Select(x => x.Test).ToJsonArray();
	}

	private void LoadLesson()
	{
		if (SelectedLesson is null) return;

		LessonTitle = SelectedLesson.Title;
		LessonBackground = SelectedLesson.Background;
		DocsPath = SelectedLesson.Docs;
		Instructions = SelectedLesson.Instructions;
		InitialCode = SelectedLesson.ContextCode;
		Solution = SelectedLesson.Solution;
		CanSave = false;
		Tests = new ObservableCollection<TestModel>(SelectedLesson.Tests.Select(x => new TestModel(x!.AsObject())));
		SelectedTest = Tests.FirstOrDefault();
	}

	private void AddTest(object sender, RoutedEventArgs e)
	{
		var newTest = new TestModel(new JsonObject());
		Tests.Add(newTest);
		SelectedTest = newTest;
	}

	private void RemoveTest(object sender, RoutedEventArgs e)
	{
		if (SelectedTest is null) return;

		var index = Tests.IndexOf(SelectedTest);
		Tests.Remove(SelectedTest);
		if (Tests.Count != 0)
		{
			index = Math.Clamp(index, 0, Tests.Count - 1);
			SelectedTest = Tests[index];
		}
		else
			SelectedTest = null!;
	}

	private void MoveTestUp(object sender, RoutedEventArgs e)
	{
		if (SelectedTest is null) return;

		var test = SelectedTest;
		var index = Tests.IndexOf(test);
		index--;
		Tests.Remove(test);  // this clears SelectedIndex somehow

		index = Math.Clamp(index, 0, Tests.Count - 1);
		Tests.Insert(index, test);

		SelectedTest = test;
	}

	private void MoveTestDown(object sender, RoutedEventArgs e)
	{
		if (SelectedTest is null) return;

		var test = SelectedTest;
		var index = Tests.IndexOf(test);
		index++;
		Tests.Remove(test);

		index = Math.Clamp(index, 0, Tests.Count);
		Tests.Insert(index, test);

		SelectedTest = test;
	}
}