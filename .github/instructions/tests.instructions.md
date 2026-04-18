---
applyTo: "LearnJsonEverything.Tests/**/*.cs,LearnJsonEverything.Tests/**/*.json"
---

# Testing Instructions

This repository uses NUnit-based tests to validate that all provided lesson solutions pass.

## Framework And Style

- Use NUnit attributes (`[Test]`, `[TestCase]`, `[TestCaseSource]`, etc.).
- Prefer `Assert.That(...)` style assertions for consistency.
- Do not introduce FluentAssertions or other assertion frameworks.

## Test Placement

- All tests live in `LearnJsonEverything.Tests/`.
- `ProvidedSolutionTests` verifies every non-skipped lesson's `Solution` field compiles and passes all lesson tests.
- For regression fixes, add or update a test that fails before the fix and passes after.

## Lesson Solution Validation

- Tests load lesson JSON files from `wwwroot/data/lessons/` (copied to output by the test project).
- Each lesson host (`SchemaHost`, `PathHost`, `JsonEHost`) is exercised against its corresponding lesson plan.
- A passing result is a string prefixed with `Iconography.SuccessIcon`; any other result is a failure.

## Local Execution

- Run focused tests first for the touched lesson topic, then the full suite as needed.
- Set `JSON_EVERYTHING_TEST_OUTPUT=True` for additional console output during local runs.
