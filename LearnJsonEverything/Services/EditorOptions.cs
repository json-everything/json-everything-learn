using BlazorMonaco.Editor;

namespace LearnJsonEverything.Services
{
	public static class EditorOptions
	{
		public static StandaloneEditorConstructionOptions Basic() =>
			new()
			{
				AutomaticLayout = true,
				Language = "csharp",
				Theme = "vs-dark",
				SelectOnLineNumbers = true,
				Scrollbar = new EditorScrollbarOptions
				{
					AlwaysConsumeMouseWheel = false
				},
				ScrollBeyondLastLine = false,
				TabSize = 4
			};

		public static StandaloneEditorConstructionOptions Readonly()
		{
			var options = Basic();
			options.ReadOnly = true;

			return options;
		}
	}
}