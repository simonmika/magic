/// <reference path="../../../Error/ConsoleHandler" />
/// <reference path="../../../IO/StringReader" />
/// <reference path="../../Token" />
/// <reference path="../Char" />
/// <reference path="../../Source" />
/// <reference path="../../../Unit/Fixture" />
/// <reference path="../../../Unit/Constraints/Is" />

module Magic.Tokens.Literals.Tests {
	import Is = Unit.Constraints.Is
	export class CharTest extends Unit.Fixture {
		constructor() {
			super("Tokens.Literals.Char")
			var errorHandler = new Error.ConsoleHandler()
			var token: Token
			this.add("empty", () => {
				var s = "''"
				var source = new Source(new IO.StringReader(s), errorHandler)
				this.expect((token = Char.scan(source)) instanceof Char, Is.True())
				this.expect((<Char>token).getValue(), Is.Equal().To(""))
			})
			this.add("newline", () => {
				var s = "'\\n'"
				var source = new Source(new IO.StringReader(s), errorHandler)
				this.expect((token = Char.scan(source)) instanceof Char, Is.True())
				this.expect((<Char>token).getValue(), Is.Equal().To("\n"))
			})
			this.add("double quote", () => {
				var s = "'\\\"'"
				var source = new Source(new IO.StringReader(s), errorHandler)
				this.expect((token = Char.scan(source)) instanceof Char, Is.True())
				this.expect((<Char>token).getValue(), Is.Equal().To("\""))
			})
		}
	}
	Unit.Fixture.add(new CharTest())
}
