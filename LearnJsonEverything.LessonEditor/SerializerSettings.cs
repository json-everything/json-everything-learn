using System.Text.Encodings.Web;
using System.Text.Json;

namespace LearnJsonEverything.LessonEditor;

public static class SerializerSettings
{
    public static readonly JsonSerializerOptions SerializerOptions =
        new()
        {
            WriteIndented = true,
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

    public static readonly JsonSerializerOptions CondensedSerializerOptions =
        new()
        {
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
}