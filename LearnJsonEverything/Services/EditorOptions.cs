using BlazorMonaco.Editor;

namespace LearnJsonEverything.Services
{
	public class EditorOptions
	{
		private readonly ThemeService _themeService;

		public EditorOptions(ThemeService themeService)
		{
			_themeService = themeService;
		}

		public StandaloneEditorConstructionOptions Basic(string lang, int tab) =>
			new()
			{
				AutomaticLayout = true,
				Language = lang,
				Theme = _themeService.MonacoTheme,
				SelectOnLineNumbers = true,
				Scrollbar = new EditorScrollbarOptions
				{
					AlwaysConsumeMouseWheel = false
				},
				ScrollBeyondLastLine = false,
				TabSize = tab
			};

		public StandaloneEditorConstructionOptions Readonly(string lang, int tab)
		{
			var options = Basic(lang, tab);
			options.ReadOnly = true;

			return options;
		}
	}
}