using BlazorMonaco.Editor;

namespace LearnJsonEverything.Services
{
	public static class EditorOptions
	{
		public static StandaloneEditorConstructionOptions Basic(string lang, int tab) =>
			new()
			{
				AutomaticLayout = true,
				Language = lang,
				Theme = "vs-dark",
				SelectOnLineNumbers = true,
				Scrollbar = new EditorScrollbarOptions
				{
					AlwaysConsumeMouseWheel = false
				},
				ScrollBeyondLastLine = false,
				TabSize = tab
			};

		public static StandaloneEditorConstructionOptions Readonly(string lang, int tab)
		{
			var options = Basic(lang, tab);
			options.ReadOnly = true;

			return options;
		}
	}
}