/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Token" />
/// <reference path="../Whitespace" />
/// <reference path="../Source" />

module Magic.Tokens.Tests {
	import Is = Unit.Constraints.Is
	export class WhitespaceTest extends Unit.Fixture {
		constructor() {
			super("Tokens.Whitespace")
			var errorHandler = new Error.ConsoleHandler()
			this.add("whitespace", () => {
				var sourceNewline = new Source(new IO.StringReader("\n"), errorHandler)
				var sourceCarriageReturn = new Source(new IO.StringReader("\r"), errorHandler)
				var sourceTab = new Source(new IO.StringReader("\t"), errorHandler)
				var sourceSpace = new Source(new IO.StringReader(" "), errorHandler)
				var token: Token
				this.expect((token = Whitespace.scan(sourceNewline)) instanceof Whitespace)
				this.expect((<Whitespace>token).getEndsLine(), Is.True())
				this.expect((token = Whitespace.scan(sourceCarriageReturn)) instanceof Whitespace)
				this.expect((<Whitespace>token).getEndsLine(), Is.False())
				this.expect((token = Whitespace.scan(sourceTab)) instanceof Whitespace)
				this.expect((<Whitespace>token).getEndsLine(), Is.False())
				this.expect((token = Whitespace.scan(sourceSpace)) instanceof Whitespace)
				this.expect((<Whitespace>token).getEndsLine(), Is.False())
			})
		}
	}
	Unit.Fixture.add(new WhitespaceTest())
}
