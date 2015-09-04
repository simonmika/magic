/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Token" />
/// <reference path="../Separator" />
/// <reference path="../Source" />

module Magic.Tokens.Tests {
	import Is = Unit.Constraints.Is
	export class SeparatorTest extends Unit.Fixture {
		constructor() {
			super("Tokens.Separator")
			var errorHandler = new Error.ConsoleHandler()
			this.add("isSeparator()", () => {
				var separator1 = new Separator(null, null)
				var separator2 = new Separator(":", null)
				this.expect(separator1.isSeparator())
				this.expect(separator1.isSeparator(""), Is.True())
				this.expect(separator1.isSeparator("."), Is.False())
				this.expect(separator2.isSeparator())
				this.expect(separator2.isSeparator("::"), Is.False())
			})
			this.add("scan separators", () => {
				var source = new Source(new IO.StringReader(".:;,[](){}"), errorHandler)
				var token: Token
				this.expect((token = Separator.scan(source)) instanceof Separator)
				this.expect((<Separator>token).getSymbol(), Is.Equal().To("."))
				this.expect((token = Separator.scan(source)) instanceof Separator)
				this.expect((<Separator>token).getSymbol(), Is.Equal().To(":"))
				this.expect((token = Separator.scan(source)) instanceof Separator)
				this.expect((<Separator>token).getSymbol(), Is.Equal().To(";"))
				this.expect((token = Separator.scan(source)) instanceof Separator)
				this.expect((<Separator>token).getSymbol(), Is.Equal().To(","))
				this.expect((token = Separator.scan(source)) instanceof Separator)
				this.expect((<Separator>token).getSymbol(), Is.Equal().To("["))
				this.expect((token = Separator.scan(source)) instanceof Separator)
				this.expect((<Separator>token).getSymbol(), Is.Equal().To("]"))
				this.expect((token = Separator.scan(source)) instanceof Separator)
				this.expect((<Separator>token).getSymbol(), Is.Equal().To("("))
				this.expect((token = Separator.scan(source)) instanceof Separator)
				this.expect((<Separator>token).getSymbol(), Is.Equal().To(")"))
				this.expect((token = Separator.scan(source)) instanceof Separator)
				this.expect((<Separator>token).getSymbol(), Is.Equal().To("{"))
				this.expect((token = Separator.scan(source)) instanceof Separator)
				this.expect((<Separator>token).getSymbol(), Is.Equal().To("}"))
			})
		}
	}
	Unit.Fixture.add(new SeparatorTest())
}