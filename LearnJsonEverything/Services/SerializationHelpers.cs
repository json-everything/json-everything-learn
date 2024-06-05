using System.Text.Encodings.Web;
using System.Text.Json;

namespace LearnJsonEverything.Services
{
	public static class SerializationHelpers
	{
		public static readonly JsonSerializerOptions SerializerOptions = new()
		{
			WriteIndented = true,
			Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
			PropertyNameCaseInsensitive = true
		};
	}
}
