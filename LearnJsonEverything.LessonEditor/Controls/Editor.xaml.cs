using System.Collections.ObjectModel;
using System.IO;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Windows;
using System.Windows.Controls;
using LearnJsonEverything.Services;
using LearnJsonEverything.Services.Hosts;

namespace LearnJsonEverything.LessonEditor.Controls;

/// <summary>
/// Interaction logic for Editor.xaml
/// </summary>
public partial class Editor : UserControl
{
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

		editor.Lessons = new ObservableCollection<LessonModel>(lessonPlan.Select(x => new LessonModel(x)));
		editor.SelectedLesson = editor.Lessons.FirstOrDefault();
	}

	public ObservableCollection<LessonModel> Lessons
	{
		get => (ObservableCollection<LessonModel>)GetValue(LessonsProperty);
		set => SetValue(LessonsProperty, value);
	}

	public static readonly DependencyProperty LessonsProperty =
		DependencyProperty.Register(nameof(Lessons), typeof(ObservableCollection<LessonModel>), typeof(Editor), new PropertyMetadata(null));

	public LessonModel? SelectedLesson
	{
		get => (LessonModel?)GetValue(SelectedLessonProperty);
		set => SetValue(SelectedLessonProperty, value);
	}

	public static readonly DependencyProperty SelectedLessonProperty =
		DependencyProperty.Register(nameof(SelectedLesson), typeof(LessonModel), typeof(Editor), new PropertyMetadata(null, SelectedLessonChanged));

	private static void SelectedLessonChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
	{
		((LessonModel?)e.OldValue)?.Save();
	}

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

	public string ValidationOutput
	{
		get => (string)GetValue(ValidationOutputProperty);
		set => SetValue(ValidationOutputProperty, value);
	}

	public static readonly DependencyProperty ValidationOutputProperty =
		DependencyProperty.Register(nameof(ValidationOutput), typeof(string), typeof(Editor), new PropertyMetadata(null));

	private void ValidateSolution(object sender, RoutedEventArgs e)
	{
		if (SelectedLesson is null) return;

		try
		{
			SelectedLesson.Save();

			SelectedLesson.Lesson.UserCode = SelectedLesson.Solution;
			var output = LessonHost.Run(SelectedLesson.Lesson);
			ValidationOutput = string.Join(Environment.NewLine, output);
			CanSave = output.All(x => x.StartsWith(Iconography.SuccessIcon));
		}
		catch (Exception exception)
		{
			ValidationOutput = exception.Message + Environment.NewLine + exception.StackTrace;
		}
	}

	private void SaveChanges(object sender, RoutedEventArgs e)
	{
		SelectedLesson?.Save();

		var content = JsonSerializer.Serialize(Lessons.Select(x => x.Lesson).ToArray(), SerializerSettings.SerializerOptions);
		var fileName = Path.Combine(DataFileFolder, Path.ChangeExtension(FileName, ".json"));
		File.WriteAllText(fileName, content);
		CanSave = false;
	}

	private void ResetContent(object sender, RoutedEventArgs e)
	{
		SelectedLesson?.Reset();
	}

	private void CopyInitialToSolution(object sender, RoutedEventArgs e)
	{
		if (SelectedLesson is null) return;

		SelectedLesson.Solution = SelectedLesson.InitialCode;
	}

	private void AddLesson(object sender, RoutedEventArgs e)
	{
		var newLesson = new LessonModel(new LessonData { Id = Guid.NewGuid() });
		Lessons.Add(newLesson);
		SelectedLesson = newLesson;
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

	private void AddTest(object sender, RoutedEventArgs e)
	{
		if (SelectedLesson is null) return;

		var newTest = new TestModel(new JsonObject());
		SelectedLesson.Tests.Add(newTest);
		SelectedLesson.SelectedTest = newTest;
	}

	private void RemoveTest(object sender, RoutedEventArgs e)
	{
		if (SelectedLesson?.SelectedTest is null) return;

		var index = SelectedLesson.Tests.IndexOf(SelectedLesson.SelectedTest);
		SelectedLesson.Tests.Remove(SelectedLesson.SelectedTest);
		if (SelectedLesson.Tests.Count != 0)
		{
			index = Math.Clamp(index, 0, SelectedLesson.Tests.Count - 1);
			SelectedLesson.SelectedTest = SelectedLesson.Tests[index];
		}
		else
			SelectedLesson.SelectedTest = null!;
	}

	private void MoveTestUp(object sender, RoutedEventArgs e)
	{
		if (SelectedLesson?.SelectedTest is null) return;

		var test = SelectedLesson.SelectedTest;
		var index = SelectedLesson.Tests.IndexOf(test);
		index--;
		SelectedLesson.Tests.Remove(test);  // this clears SelectedIndex somehow

		index = Math.Clamp(index, 0, SelectedLesson.Tests.Count - 1);
		SelectedLesson.Tests.Insert(index, test);

		SelectedLesson.SelectedTest = test;
	}

	private void MoveTestDown(object sender, RoutedEventArgs e)
	{
		if (SelectedLesson?.SelectedTest is null) return;

		var test = SelectedLesson.SelectedTest;
		var index = SelectedLesson.Tests.IndexOf(test);
		index++;
		SelectedLesson.Tests.Remove(test);

		index = Math.Clamp(index, 0, SelectedLesson.Tests.Count);
		SelectedLesson.Tests.Insert(index, test);

		SelectedLesson.SelectedTest = test;
	}

	private void SelectedTestChanged(object sender, SelectionChangedEventArgs e)
	{
		TestInput.GetBindingExpression(CodeInput.CodeContentProperty)?.UpdateTarget();
	}
}