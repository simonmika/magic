/// <reference path="../../../Error/ConsoleHandler" />
/// <reference path="../../../Error/Position" />
/// <reference path="../../../Error/Location" />
/// <reference path="../../../Error/Region" />
/// <reference path="../../../IO/BufferedReader" />
/// <reference path="../../../IO/StringReader" />
/// <reference path="../../../Tokens/Lexer" />
/// <reference path="../../../Tokens/GapRemover" />
/// <reference path="../../../Unit/Fixture" />
/// <reference path="../../../Unit/Constraints/Is" />
/// <reference path="../../Parser" />
/// <reference path="../../Module" />
/// <reference path="../Assignment" />
/// <reference path="../Identifier" />
/// <reference path="../Literals/CharacterLiteral" />
/// <reference path="../Literals/NumberLiteral" />

module Magic.SyntaxTree.Expressions.Tests {
	import Is = Unit.Constraints.Is
	export class AssignmentTest extends Unit.Fixture {
		constructor() {
			super("SyntaxTree.Expressions.Assignment")
			var handler = new Error.ConsoleHandler()
			this.add("character literal", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("a = 'b'"), handler)), handler)
				var statements = parser.next().getStatements()
				var result = <Expressions.Assignment>statements.next()
				this.expect(result.getLeft().getName(), Is.Equal().To("a"))
				this.expect((<Expressions.Literals.CharacterLiteral>result.getRight()).getValue(), Is.Equal().To("b"))
			})
			this.add("number literal", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("a = 12345"), handler)), handler)
				var statements = parser.next().getStatements()
				var result = <Expressions.Assignment>statements.next()
				this.expect(result.getLeft().getName(), Is.Equal().To("a"))
				this.expect((<Expressions.Literals.NumberLiteral>result.getRight()).getValue(), Is.Equal().To(12345))
			})
			this.add("variable", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("a = b"), handler)), handler)
				var statements = parser.next().getStatements()
				var result = <Expressions.Assignment>statements.next()
				this.expect(result.getLeft().getName(), Is.Equal().To("a"))
				this.expect((<Expressions.Identifier>result.getRight()).getName(), Is.Equal().To("b"))
			})
		}
	}
	Unit.Fixture.add(new AssignmentTest())
}
