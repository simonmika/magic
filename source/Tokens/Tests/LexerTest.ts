/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Token" />
/// <reference path="../Lexer" />

module Magic.Tokens.Tests {
	import Is = Unit.Constraints.Is
	export class LexerTest extends Unit.Fixture {
		constructor() {
			super("LexerTest")
			var errorHandler = new Error.ConsoleHandler()
			this.add("expression 1", () => {
				var lexer = new Lexer(new IO.StringReader("a+b\0"), errorHandler)
				this.expect(lexer.next(), Is.Not().NullOrUndefined())
				this.expect(lexer.next(), Is.Not().NullOrUndefined())
				this.expect(lexer.next(), Is.Not().NullOrUndefined())
			})
			this.add("expression 2", () => {
				var lexer = new Lexer(new IO.StringReader("a+b\0"), errorHandler)
				this.expect(lexer.next().isIdentifier())
				this.expect(lexer.next().isOperator())
				this.expect(lexer.next().isIdentifier())
			})
		}
	}
}