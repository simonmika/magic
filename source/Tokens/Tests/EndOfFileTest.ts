/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Token" />
/// <reference path="../EndOfFile" />
/// <reference path="../Source" />

module Magic.Tokens.Tests {
	import Is = Unit.Constraints.Is
	export class EndOfFileTest extends Unit.Fixture {
		constructor() {
			super("Tokens.EndOfFile")
			var errorHandler = new Error.ConsoleHandler()
			this.add("empty source string", () => {
				var source = new Source(new IO.StringReader(""), errorHandler)
				var token = EndOfFile.scan(source)
				this.expect(token instanceof EndOfFile)
			})
			this.add("null string", () => {
				var source = new Source(new IO.StringReader("\0"), errorHandler)
				var token = EndOfFile.scan(source)
				this.expect(token instanceof EndOfFile)
			})
		}
	}
	Unit.Fixture.add(new EndOfFileTest())
}
