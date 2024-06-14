using System.Text.Json.Nodes;
using System.Windows;
using Json.More;

namespace LearnJsonEverything.LessonEditor.Controls;

public class TestModel : DependencyObject
{

	public JsonObject Test { get; private set; }

	public string Condensed
	{
		get => (string)GetValue(CondensedProperty);
		set => SetValue(CondensedProperty, value);
	}

	public static readonly DependencyProperty CondensedProperty =
		DependencyProperty.Register(nameof(Condensed), typeof(string), typeof(TestModel), new PropertyMetadata(null));

	public string Formatted
	{
		get => (string)GetValue(FormattedProperty);
		set => SetValue(FormattedProperty, value);
	}

	public static readonly DependencyProperty FormattedProperty =
		DependencyProperty.Register(nameof(Formatted), typeof(string), typeof(TestModel), new PropertyMetadata(null, FormattedChanged));

	public TestModel(JsonObject test)
	{
		Formatted = test.AsJsonString(SerializerSettings.SerializerOptions);
	}

	private static void FormattedChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
	{
		var model = (TestModel)d;
		try
		{
			model.Test = JsonNode.Parse(model.Formatted)!.AsObject();
			model.Condensed = model.Test.AsJsonString(SerializerSettings.CondensedSerializerOptions);
		}
		catch
		{
			// ignored
		}
	}
}