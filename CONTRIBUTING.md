# Community Engagement

Questions, suggestions, corrections.  All are welcome.

Channels for community engagement (where I'll be looking) include:

- Issues
- Slack (link in the README)
- StackOverflow (tag with `json-everything`)

# Lesson Authorship

The lessons are stored in several JSON files located in the `/LearnJsonEverything/wwwroot/data/lessons` folder.  Each page on the site has its own file.

There is also an editor app for authoring lessons that is built with WPF, so it only runs on Windows.  When using the app, you'll need to validate the lesson before saving by clicking the "Validate" button.

The unit tests run and validate all of the lessons and are run as part of the build.

# Development

## Requirements

This is a Blazor WASM site running on .Net 8, so you'll need those.

All of the projects are configured to use the latest C# version.

## IDE

I use Visual Studio Community with Resharper, and I try to keep everything updated.

Jetbrains Rider (comes with the Resharper stuff built-in), VS Code with your favorite extensions, or any basic text editor and a command line would work just fine.  You do you.

## Command Line

The site and editor app can be run through Visual Studio (or probably through whatever IDE you're using).

Alternatively, you can run them using the `run` script file in the repository root.

- `run` on its own will run the site.
- `run edit` will run the editor.

## Code Style & Releases

While I do have an `.editorconfig` that most editors should respect, please feel free to add any code contributions using your own coding style.  Trying to conform to someone else's style can be a headache and confusing, and I prefer working code over pretty code.  I find it's easier for contributors if I make my own style adjustments after a contribution rather than forcing conformance to my preferences.

Deployments to [learn.json-everything.net](https://learn.json-everything.net) occur automatically upon merging with `master`.

## Submitting PRs

Please be sure that an issue has been opened to allow for proper discussion before submitting a PR.  If the project maintainers decide _not_ to merge your PR, you might feel you've wasted your time, and no one wants that.

## What Needs Doing?

Anything in the [issues](https://github.com/json-everything/json-everything-learn/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) with a `help wanted` label is something that could benefit from a volunteer or two.

Outside of this, PRs are welcome.  For larger changes, it's preferred that there be some discussion in an issue before a PR is submitted.  Mainly, I don't want you to feel like you've wasted your time if changes are requested or the PR is ultimately closed unmerged.
