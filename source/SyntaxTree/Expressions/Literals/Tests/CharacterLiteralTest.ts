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
/// <reference path="../../Literals/CharacterLiteral" />

module Magic.SyntaxTree.Tests {
	import Is = Unit.Constraints.Is
	export class CharacterLiteralTest extends Unit.Fixture {
		constructor() {
			super("SyntaxTree.Expressions.Literals.CharacterLiteral")
			var handler = new Error.ConsoleHandler()
			this.add("literal", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("'a'"), handler)), handler)
				var statements = parser.next().getStatements()
				var literal = statements.next()
				this.expect(literal instanceof Expressions.Literals.CharacterLiteral, Is.True())
				this.expect((<Expressions.Literals.CharacterLiteral>literal).getValue(), Is.Equal().To("a"))
			})
		}
	}
	Unit.Fixture.add(new CharacterLiteralTest())
}
