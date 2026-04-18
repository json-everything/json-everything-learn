---
applyTo: "LearnJsonEverything/Services/Hosts/**/*.cs"
---

# Lesson Host Instructions

These instructions apply to `ILessonHost` implementations in `LearnJsonEverything/Services/Hosts/`.

## Scope

- Each host (`SchemaHost`, `PathHost`, `JsonEHost`) handles one lesson topic.
- Hosts compile user-submitted code, execute it against lesson tests, and return result strings.

## Implementation Patterns

- Implement `ILessonHost` with a single `Run(LessonData lesson)` method returning `string[]`.
- Use `CompilationHelpers` to compile user code at runtime.
- Each result string must be prefixed with either `Iconography.SuccessIcon` (pass) or `Iconography.FailIcon` (fail).
- Keep test execution logic consistent across hosts so lesson behavior is predictable.

## Adding A New Host

- Add a new `*Host.cs` file to `Services/Hosts/`.
- Add a corresponding `ILessonRunner<T>` generic variant if a new return type is needed.
- Register the new host in the relevant Blazor page or service.
- Add a new lesson JSON file in `wwwroot/data/lessons/` and a matching `[TestCaseSource]` in `ProvidedSolutionTests`.
