using System.Windows;
using System.Windows.Controls;

namespace LearnJsonEverything.LessonEditor.Controls
{
	/// <summary>
	/// Interaction logic for TextInput.xaml
	/// </summary>
	public partial class CodeInput : UserControl
	{
		public CodeInput()
		{
			InitializeComponent();
		}

		public string Label
		{
			get => (string)GetValue(LabelProperty);
			set => SetValue(LabelProperty, value);
		}

		public static readonly DependencyProperty LabelProperty =
			DependencyProperty.Register(nameof(Label), typeof(string), typeof(CodeInput), new PropertyMetadata(string.Empty));

		public string CodeContent
		{
			get => (string)GetValue(CodeContentProperty);
			set => SetValue(CodeContentProperty, value);
		}

		public static readonly DependencyProperty CodeContentProperty =
			DependencyProperty.Register(nameof(CodeContent), typeof(string), typeof(CodeInput), new PropertyMetadata(string.Empty));

		public bool IsReadOnly
		{
			get => (bool)GetValue(IsReadOnlyProperty);
			set => SetValue(IsReadOnlyProperty, value);
		}

		public static readonly DependencyProperty IsReadOnlyProperty =
			DependencyProperty.Register(nameof(IsReadOnly), typeof(bool), typeof(CodeInput), new PropertyMetadata(false));
	}
}
