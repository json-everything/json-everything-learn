---
applyTo: "*.cs,*.csproj"
---

# Architecture Instructions

This repository is a Blazor WebAssembly interactive learning site for JSON tooling libraries.

## Solution Structure

- `LearnJsonEverything/` — Main Blazor WASM application (pages, services, shared components, lesson data).
- `LearnJsonEverything.Template/` — Shared interface project defining `ILessonRunner<T>`, consumed by both the app and user lesson solutions.
- `LearnJsonEverything.Tests/` — NUnit test project that validates all provided lesson solutions.
- `LearnJsonEverything.LessonEditor/` — WPF desktop tool for authoring lesson JSON files.
- Lesson data (JSON files) lives in `LearnJsonEverything/wwwroot/data/lessons/`.

## Project Organization

- Keep UI concerns (pages, components) in `LearnJsonEverything/Pages/` and `LearnJsonEverything/Shared/`.
- Keep non-UI logic in `LearnJsonEverything/Services/`.
- Keep lesson host implementations in `LearnJsonEverything/Services/Hosts/`.
- The `LearnJsonEverything.Template/` project must stay minimal — it defines the base interface for user-submitted code.
- Do not add dependencies to `LearnJsonEverything.Template/`; it must remain lightweight.

## Target Frameworks

- All projects target `net8.0`.
- Do not change target frameworks unless explicitly requested.

## Dependency Direction

- `LearnJsonEverything` references `LearnJsonEverything.Template`.
- `LearnJsonEverything.Tests` references `LearnJsonEverything`.
- `LearnJsonEverything.LessonEditor` is a standalone tool; do not introduce cross-references with the main app.
- Keep external dependencies minimal and justified.

## Behavior Changes

- Any behavioral change should include a corresponding update to affected lesson JSON or a new test case.
- Avoid broad refactors when a local fix is sufficient.
