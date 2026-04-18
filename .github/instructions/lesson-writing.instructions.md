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

## Writing Good Lessons

### Background
- Explain the concept clearly before asking the user to use it.
- Use Markdown formatting. Inline code and links are encouraged.
- Keep it focused on what this lesson teaches — do not repeat content from prior lessons unless briefly recapping.

### Instructions
- State exactly what the user must do, in one or two sentences.
- Use imperative language: "Parse the path…", "Write a query that…", "Return null if…".
- Do not explain how — that belongs in the background.

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

## Ordering

- Order lessons from simplest to most complex within a topic.
- Each lesson should build on concepts introduced in previous lessons.
- Use `"skip": true` to stub out a planned lesson without breaking the site or tests.

## IDs

- Use a freshly generated GUID for each new lesson.
- Never reuse or change an existing lesson's `id`.
