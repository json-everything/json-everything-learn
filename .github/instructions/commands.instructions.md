---
applyTo: "**"
---

# Essential Commands

## Restore And Build

```bash
dotnet restore
dotnet build --configuration Release --no-restore
```

## Run Tests

```bash
dotnet test --no-restore --verbosity normal --logger:"trx;LogFileName=test-results.trx"
```

Focused example:

```bash
dotnet test LearnJsonEverything.Tests/LearnJsonEverything.Tests.csproj
```

Optional local diagnostic output:

```bash
# PowerShell
$env:JSON_EVERYTHING_TEST_OUTPUT = "True"
dotnet test
```
