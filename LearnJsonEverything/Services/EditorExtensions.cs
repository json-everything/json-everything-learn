using BlazorMonaco.Editor;
using Microsoft.JSInterop;

namespace LearnJsonEverything.Services;

public static class EditorExtensions
{
	public static void SetLanguage(this StandaloneCodeEditor editor, string language, IJSRuntime jsRuntime)
	{
		editor.GetModel()
			.ContinueWith(x => Global.SetModelLanguage(jsRuntime, x.Result, language));
	}

	public static async Task SetLanguageAsync(this StandaloneCodeEditor editor, string language, IJSRuntime jsRuntime)
	{
		var model = await editor.GetModel();
		await Global.SetModelLanguage(jsRuntime, model, language);
	}
}