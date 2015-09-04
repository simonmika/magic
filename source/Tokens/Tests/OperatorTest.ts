/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Token" />
/// <reference path="../Operator" />
/// <reference path="../Source" />

module Magic.Tokens.Tests {
	import Is = Unit.Constraints.Is
	export class OperatorTest extends Unit.Fixture {
		constructor() {
			super("Tokens.Operator")
			var errorHandler = new Error.ConsoleHandler()
			this.add("arithmetic", () => {
				var source = new Source(new IO.StringReader("+-*/**%++***"), errorHandler)
				var op: Token
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("+"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("-"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("*"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("/"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("**"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("%"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("++"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("**"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("*"))
			})
			this.add("binary/bitwise and logical", () => {
				var source = new Source(new IO.StringReader("<<>>^&|||&&"), errorHandler)
				var op: Token
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("<<"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To(">>"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("^"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("&"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("||"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("|"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("&&"))
			})
			this.add("assignment", () => {
				var source = new Source(new IO.StringReader("=-=*=/=**=%=<<=>>=^=&=|=:=::="), errorHandler)
				var op: Token
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("-="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("*="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("/="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("**="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("%="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("<<="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To(">>="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("^="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("&="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("|="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To(":="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("::="))
			})
			this.add("comparison", () => {
				var source = new Source(new IO.StringReader("==<><=:==<==>>=!="), errorHandler)
				var op: Token
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("=="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("<"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To(">"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("<="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To(":=="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("<==>"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To(">="))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("!="))
			})
			this.add("unary", () => {
				var source = new Source(new IO.StringReader("!@~?"), errorHandler)
				var op: Token
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("!"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("@"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("~"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("?"))
			})
			this.add("misfits", () => {
				var source = new Source(new IO.StringReader("..->=>"), errorHandler)
				var op: Token
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To(".."))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("->"))
				this.expect((op = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>op).getSymbol(), Is.Equal().To("=>"))
			})
		}
	}
	Unit.Fixture.add(new OperatorTest())
}
