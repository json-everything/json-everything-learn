---
applyTo: "LearnJsonEverything/wwwroot/data/lessons/**/*.json"
---

# Lesson Writing Instructions

This document defines standards for authoring lesson JSON files.

## Core Principle

Each lesson must cover exactly one use case or feature. Do not combine multiple concepts in a single lesson. If a topic has several related aspects, split them into sequential lessons.

## Lesson JSON Structure

Each lesson is an object in the lesson plan array with these fields:

| Field | Type | Purpose |
|---|---|---|
| `id` | GUID string | Unique stable identifier. Generate once; never change. |
| `skip` | boolean | Set to `true` to hide the lesson from the UI and tests. |
| `title` | string | Short, descriptive name shown in the UI. |
| `background` | string (Markdown) | Conceptual explanation of the feature or topic. Rendered before the editor. |
| `docs` | string or null | Relative docs path shown as a link (e.g. `"path/basics"`). |
| `api` | string or null | API reference link. |
| `schemaDocs` | string or null | Schema spec link. Only used for Schema lessons. |
| `instructions` | string (Markdown) | The task the user must complete. Kept short and focused. |
| `contextCode` | string | Starting C# code shown in the editor. Contains `/* USER CODE */` where the user writes. |
| `tests` | JSON array | One object per test case. Each object contains input fields and a `result` field. |
| `solution` | string | Complete, valid C# code that passes all tests. |

## General Instructions (Overall)

- Teach the libraries only: focus lessons on how to use json-everything APIs and behaviors, not on teaching the underlying technology or specification.
- Assume the student already understands the underlying technology and is here to learn how to exercise that technology through the libraries.
- Use progressive disclosure to control complexity. Introduce only the features required by the current lesson objective; defer optional or advanced features until their dedicated lessons.
- When proposing or revising a lesson plan, define each lesson by the library capability the user will implement in C# (API call, option/configuration, extension point, or library-specific error handling).
- Do not propose lessons framed primarily as technology topics (spec sections, operator catalogs, syntax tours, or language feature overviews) unless the lesson objective is explicitly tied to using a library surface.
- Library touch is not sufficient. A lesson objective is valid only when the core skill is choosing or applying a library surface, and spec syntax/keywords are only inputs used to exercise that surface.
- Reusability test: if the same lesson objective would read essentially the same after swapping in another conforming implementation, the objective is spec-first and must be rewritten.
- Success criteria must be library-behavior focused (what API/options/extension point behavior the user achieves), not spec-knowledge focused (what keyword or grammar rule the user can describe).
- Do not break the fourth wall: user-facing lesson text must not reference tests, test runners, or lesson-host internals.
- Teach the current API directly; do not describe how it changed from older versions.
- Keep each lesson focused on its single concept without reteaching prior lessons in depth.
- Avoid repeating prior lesson explanations. Later lessons should reference previously introduced APIs briefly and focus background text on what is newly added in the current lesson.
- In sequential lesson tracks, write openings that continue from prior lessons instead of restating broad topic framing in each lesson.
- Avoid stylistic section breaks made from dashes in lesson prose.
- Use transitions between adjacent lessons for flow, but do not imply a technical dependency unless one truly exists.
- If the next lesson shifts topics, do not force an artificial segue; briefly reframe the new topic and continue.
- When teaching build options around references and dialect, present schema registry scoping and dialect selection as independent build-time controls.
- Do not add a lesson when the only new idea is specification behavior and the library usage is unchanged from prior lessons.

## Sectional Instructions

### Background
- Explain the concept clearly before asking the user to use it.
- Use Markdown formatting. Inline code and links are encouraged.
- Prefer in-depth backgrounds: typically at least two substantial paragraphs that cover both concept and practical usage.
- Keep `background` explanatory without prescribing the exact implementation path step-by-step.

### Instructions
- State exactly what the user must do, in one or two sentences.
- Use imperative language: "Parse the path…", "Write a query that…", "Return null if…".
- Name the required library action at the capability level (method family/class/option/exception behavior) so the objective is implementation-focused rather than concept-only.
- Do not reveal the full implementation path in the task text. Avoid naming the exact operator or single method call when that would make the solution trivial.
- Do not explain how — that belongs in the background.
- Do not refer to the testing framework or expected test mechanics in user-facing task text.
- Keep `instructions` goal-oriented and capability-focused. Avoid wording that dictates one exact method/operator unless that method is itself the lesson objective.

### Context Code
- Place `/* USER CODE */` at the exact point where the user should write their code.
- The class must be named `Lesson` and implement `ILessonRunner<T>` with the appropriate type parameter.
- Import only the namespaces needed for this lesson.
- Keep surrounding scaffolding minimal so the user's task is obvious.

### Tests
- Include at least two test cases: one typical case and one edge or boundary case.
- Each test object must contain a `result` field matching what `ILessonHost` expects.
- Keep test data simple and directly relevant to the lesson's single concept.
- Use `null` results where the lesson involves handling failure or missing values.

### Solution
- The solution must be a complete, compilable C# class body — not a fragment.
- It should be the simplest correct implementation, not a showcase of advanced techniques.
- Must pass all tests when run by the corresponding `ILessonHost`.
- For lessons that include `/* USER CODE */` in `contextCode`, the `solution` must preserve all provided code exactly and only replace that placeholder region.
- Do not refactor scaffolding in `solution` (e.g., changing object initialization style, moving existing fluent calls, or rewriting setup already provided in `contextCode`).

## Targeted Instructions

### JSON Path Lessons
- Exception to the library-only rule: JSON Path lessons may teach RFC 9535 semantics directly when needed because high-quality RFC 9535 learning resources are limited.
- This exception applies only to JSON Path lessons.

### JsonSchema Lessons
- Prefer this flow when a lesson explicitly teaches options:
	1. Create `BuildOptions`.
	2. Build the schema using those build options.
	3. Read the instance from test input as `JsonElement`.
	4. Create `EvaluationOptions`.
	5. Evaluate using the evaluation options.
- In early lessons, do not introduce `BuildOptions` or `EvaluationOptions` unless they are required for the lesson objective.
- If options are not part of the objective, prefer the simplest valid API usage and defer options to later dedicated lessons.
- For construction lessons, explain multiple available construction methods in `background` and allow the exercise scenario to support method choice where practical.
- Prefer realistic schema-input patterns in examples. For common usage, favor parsing raw JSON text and working from a document root element instead of `SerializeToElement(...)` unless serialization is itself the concept being taught.
- Prefer `JsonElement` inputs to `schema.Evaluate(...)` instead of `JsonNode` values.
- If a lesson objective is about build options, pass `BuildOptions` into schema builders in both `contextCode` and `solution`.
- Do not manually register schemas into a registry when the lesson relies on schema self-registration during build unless manual registration is the explicit objective.
- Use `https://learn.json-everything.net/...` for illustrative schema IDs and references in lessons.

## Ordering

- Order lessons from simplest to most complex within a topic.
- Each lesson should build on concepts introduced in previous lessons.
- Use `"skip": true` to stub out a planned lesson without breaking the site or tests.

## IDs

- Use a freshly generated GUID for each new lesson.
- Never reuse or change an existing lesson's `id`.
