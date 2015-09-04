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
			this.add("isOperator()", () => {
				var operator1 = new Operator(null, null)
				var operator2 = new Operator(">", null)
				this.expect(operator1.isOperator())
				this.expect(operator1.isOperator(""), Is.True())
				this.expect(operator1.isOperator("+"), Is.False())
				this.expect(operator2.isOperator())
				this.expect(operator2.isOperator(">"))
				this.expect(operator2.isOperator("+"), Is.False())
			})
			this.add("scan operator", () => {
				var source = new Source(new IO.StringReader("<==>"), errorHandler)
				var token = Operator.scan(source)
				this.expect(token instanceof Operator)
				this.expect(token.isOperator())
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("<==>"))
			})
			this.add("arithmetic", () => {
				var source = new Source(new IO.StringReader("+-*/**%++***"), errorHandler)
				var token: Token
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("+"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("-"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("*"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("/"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("**"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("%"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("++"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("**"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("*"))
			})
			this.add("binary/bitwise and logical", () => {
				var source = new Source(new IO.StringReader("<<>>^&|||&&"), errorHandler)
				var token: Token
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("<<"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To(">>"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("^"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("&"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("||"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("|"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("&&"))
			})
			this.add("assignment", () => {
				var source = new Source(new IO.StringReader("=-=*=/=**=%=<<=>>=^=&=|=:=::="), errorHandler)
				var token: Token
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("-="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("*="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("/="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("**="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("%="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("<<="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To(">>="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("^="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("&="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("|="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To(":="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("::="))
			})
			this.add("comparison", () => {
				var source = new Source(new IO.StringReader("==<><=:==<==>>=!="), errorHandler)
				var token: Token
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("=="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("<"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To(">"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("<="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To(":=="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("<==>"))
				this.expect((token= Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To(">="))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("!="))
			})
			this.add("unary", () => {
				var source = new Source(new IO.StringReader("!@~?"), errorHandler)
				var token: Token
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("!"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("@"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("~"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("?"))
			})
			this.add("misfits", () => {
				var source = new Source(new IO.StringReader("..->=>"), errorHandler)
				var token: Token
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To(".."))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("->"))
				this.expect((token = Operator.scan(source)) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("=>"))
			})
		}
	}
	Unit.Fixture.add(new OperatorTest())
}
