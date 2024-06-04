using BlazorMonaco.Editor;

namespace LearnJsonEverything.Services;

public static class DataManagerExtensions
{
	public static async Task SaveEditorValue(this DataManager dataManager, StandaloneCodeEditor editor, string key)
	{
		var text = await editor.GetValue();

		await dataManager.Set(key, text);
	}

	public static async Task LoadEditorValue(this DataManager dataManager, StandaloneCodeEditor editor, string key)
	{
		var text = await dataManager.Get(key) ?? string.Empty;

		await editor.SetValue(text);
	}
}