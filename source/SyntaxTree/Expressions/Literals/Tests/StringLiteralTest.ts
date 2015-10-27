/// <reference path="../../../../Error/ConsoleHandler" />
/// <reference path="../../../../Error/Position" />
/// <reference path="../../../../Error/Location" />
/// <reference path="../../../../Error/Region" />
/// <reference path="../../../../IO/BufferedReader" />
/// <reference path="../../../../IO/StringReader" />
/// <reference path="../../../../Tokens/Lexer" />
/// <reference path="../../../../Tokens/GapRemover" />
/// <reference path="../../../../Unit/Fixture" />
/// <reference path="../../../../Unit/Constraints/Is" />
/// <reference path="../../../Parser" />
/// <reference path="../../../Module" />
/// <reference path="../../Literals/StringLiteral" />

module Magic.SyntaxTree.Tests {
	import Is = Unit.Constraints.Is
	export class StringLiteralTest extends Unit.Fixture {
		constructor() {
			super("SyntaxTree.Expressions.Literals.CharacterLiteral")
			var handler = new Error.ConsoleHandler()
			this.add("literal", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("\"\\\"string\\\"\""), handler)), handler)
				var statements = parser.next().getStatements()
				var literal = statements.next()
				this.expect(literal instanceof Expressions.Literals.StringLiteral, Is.True())
				this.expect((<Expressions.Literals.StringLiteral>literal).getValue(), Is.Equal().To("\"string\""))
			})
		}
	}
	Unit.Fixture.add(new StringLiteralTest())
}
