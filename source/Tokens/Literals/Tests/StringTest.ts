/// <reference path="../../../Error/ConsoleHandler" />
/// <reference path="../../../IO/StringReader" />
/// <reference path="../../Token" />
/// <reference path="../String" />
/// <reference path="../../Source" />
/// <reference path="../../../Unit/Fixture" />
/// <reference path="../../../Unit/Constraints/Is" />

module Magic.Tokens.Literals.Tests {
	import Is = Unit.Constraints.Is
	export class StringTest extends Unit.Fixture {
		constructor() {
			super("StringToken")
			var errorHandler = new Error.ConsoleHandler()
			var token: Token
			this.add("empty", () => {
				var s = "\"\""
				var source = new Source(new IO.StringReader(s), errorHandler)
				this.expect((token = String.scan(source)) instanceof String && (<String>token).getValue() === "")
			})
			this.add("string with escape sequence #1", () => {
				var s = "\" \\\" \""
				var source = new Source(new IO.StringReader(s), errorHandler)
				this.expect((token = String.scan(source)) instanceof String && (<String>token).getValue() === " \" ")
			})
		}
	}
	Unit.Fixture.add(new StringTest())
}