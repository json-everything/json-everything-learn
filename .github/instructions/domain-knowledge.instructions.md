---
applyTo: "*.cs"
---

# Domain Knowledge Instructions

This repository is an interactive learning site for JSON tooling libraries (`JsonSchema.Net`, `JsonPath.Net`, `JsonE.Net`, etc.).

## Product Intent

- The site teaches users how to use json-everything libraries through guided, hands-on lessons.
- Lesson content drives everything: each lesson has instructions, context code, user-editable code, tests, and a provided solution.
- Correctness of lesson solutions is verified by the `LearnJsonEverything.Tests` project.

## Lesson System

- `LessonData` defines a single lesson: title, instructions (Markdown), context code, user code, tests (JSON array), and a solution.
- `LessonPlan` is a collection of `LessonData` entries, serialized as a JSON file under `wwwroot/data/lessons/`.
- Each lesson topic (Schema, Path, JSON-e) has its own JSON file and a corresponding `ILessonHost` implementation in `Services/Hosts/`.
- `ILessonHost.Run(LessonData)` compiles user code, executes it against the lesson tests, and returns result strings prefixed with `Iconography.SuccessIcon` or `Iconography.FailIcon`.
- `ILessonRunner<T>` (in `LearnJsonEverything.Template`) is the interface that user-submitted code must implement.

## Lesson Data Conventions

- Lesson JSON files use camelCase property names and are deserialized with `PropertyNameCaseInsensitive = true`.
- The `Skip` property allows a lesson to be excluded from both the UI and test runs.
- Solutions in lesson JSON are complete C# class bodies implementing `ILessonRunner<T>`.

## Runtime Environment

- The app runs in Blazor WebAssembly (browser sandbox). There is no server-side execution.
- User code is compiled at runtime using `Microsoft.CodeAnalysis.CSharp.Scripting` via `CompilationHelpers`.
- Lesson editors run on the desktop via the `LearnJsonEverything.LessonEditor` WPF tool.

## JSON And Serialization

- Use `System.Text.Json` patterns throughout; do not introduce alternate JSON stacks.
- For inline JSON literals in C# source, use two-space indentation.
