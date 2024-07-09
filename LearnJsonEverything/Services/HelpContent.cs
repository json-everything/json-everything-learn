namespace LearnJsonEverything.Services;

public static class HelpContent
{
	public const string Intro =
		"""
		Welcome to _Learn `json-everything`_: your personal training grounds for learning how to
		use the `json-everything` libraries to their full potential!
		
		Inside, you'll find a collection of lessons, each of which highlight a specific feature
		provided by one of the libraries. For each lesson, you'll be given some background information,
		possibly some links to various documentation, and a coding challenge along with some test
		cases.  Make all the tests pass to move on to the next lesson.

		The site will let you build whatever solution you want, and many of the lessons can be
		solved in different ways.  If you get stuck, there is a recommended solution that you can
		view at any time.
		
		Want to skip ahead and work on a particular lesson? No problem: simply select the lesson
		you'd like to work on from the pane on the left.  The navigation buttons will activate as
		needed to provide a guided experience, but you're free to work on any lessons you want at
		any time.
		
		To assist you on your journey, the site will keep track of the lessons you've completed
		as well as your solutions to them so that you can take a break and come back at any time
		either to continue learning or to review the work you've done.

		You can click <kbd>Reveal Solution</kbd> at any time to see the recommended solution, or
		<kbd>Reset</kbd> to get the template back and clear the lesson state.
		
		---
		
		**This site is 100% client-side. All operations are performed in your browser.**
		
		---
		
		These lessons are about learning the libraries, not the technologies they implement.
		For information on the technologies themselves, please see the following sites:
		
		|||
		|:-|:-|
		|JSON Schema|[https://www.learnjsonschema.com/](https://www.learnjsonschema.com/)|
		|JSON-e|[https://json-e.js.org/](https://json-e.js.org/)|
		|JSON Logic|[https://jsonlogic.com/](https://jsonlogic.com/)|
		|JSON Patch|[https://jsonpatch.com/](https://jsonpatch.com/)|
		""";

	public const string BlogPromo = "Stay up to date on the project";
	public const string DocsPromo = "How to use the libraries, API documentation, and release notes";
	public const string PlaygroundPromo = "Play with the technologies implemented by the libraries";
}
