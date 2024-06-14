if "%1" == "edit" (
    dotnet build LearnJsonEverything.LessonEditor/LearnJsonEverything.LessonEditor.csproj
    pushd "LearnJsonEverything.LessonEditor\bin\Debug\net8.0-windows\" && start LearnJsonEverything.LessonEditor.exe && popd
) else (
    dotnet run --project LearnJsonEverything/LearnJsonEverything.csproj
)


