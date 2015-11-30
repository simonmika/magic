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
/// <reference path="../../Literals/NumberLiteral" />

module Magic.SyntaxTree.Expressions.Literals.Tests {
	import Is = Unit.Constraints.Is
	export class NumberLiteralTest extends Unit.Fixture {
		constructor() {
			super("SyntaxTree.Expressions.Literals.NumberLiteral")
			var handler = new Error.ConsoleHandler()
			this.add("integer", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("12345"), handler)), handler)
				var statements = parser.next().getStatements()
				var literal = statements.next()
				this.expect(literal instanceof Expressions.Literals.NumberLiteral, Is.True())
				this.expect((<Expressions.Literals.NumberLiteral>literal).getValue(), Is.Equal().To("12345"))
			})
			this.add("float", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("0.1234f"), handler)), handler)
				var statements = parser.next().getStatements()
				var literal = statements.next()
				this.expect(literal instanceof Expressions.Literals.NumberLiteral, Is.True())
				this.expect((<Expressions.Literals.NumberLiteral>literal).getValue(), Is.Equal().To("0.1234"))
			})
			this.add("binary", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("0b11000000111001"), handler)), handler)
				var statements = parser.next().getStatements()
				var literal = statements.next()
				this.expect(literal instanceof Expressions.Literals.NumberLiteral, Is.True())
				this.expect((<Expressions.Literals.NumberLiteral>literal).getValue(), Is.Equal().To("12345"))
			})
			this.add("octal", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("0c30071"), handler)), handler)
				var statements = parser.next().getStatements()
				var literal = statements.next()
				this.expect(literal instanceof Expressions.Literals.NumberLiteral, Is.True())
				this.expect((<Expressions.Literals.NumberLiteral>literal).getValue(), Is.Equal().To("12345"))
			})
			this.add("hexadecimal", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("0xD431"), handler)), handler)
				var statements = parser.next().getStatements()
				var literal = statements.next()
				this.expect(literal instanceof Expressions.Literals.NumberLiteral, Is.True())
				this.expect((<Expressions.Literals.NumberLiteral>literal).getValue(), Is.Equal().To("54321"))
			})
		}
	}
	Unit.Fixture.add(new NumberLiteralTest())
}
