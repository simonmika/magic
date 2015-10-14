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
/// <reference path="../../Declarations/Function" />

module Magic.SyntaxTree.Tests {
	import Is = Unit.Constraints.Is
	export class FunctionTest extends Unit.Fixture {
		constructor() {
			super("SyntaxTree.Declarations.Function")
			this.add("empty function", () => {
				var handler = new Error.ConsoleHandler()
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("Empty: func\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var functionDeclaration = <Declarations.Function> statements.next()
				this.expect(functionDeclaration.getSymbol(), Is.Equal().To("Empty"))
			})
			this.add("empty function with parameters", () => {
				var handler = new Error.ConsoleHandler()
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("Empty: func (i: Int, j: Float, k: Double)\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var functionDeclaration = <Declarations.Function> statements.next()
				this.expect(functionDeclaration.getSymbol(), Is.Equal().To("Empty"))
			})
			this.add("empty function with parameters reduced", () => {
				var handler = new Error.ConsoleHandler()
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("Empty: func (i, j, k: Int)\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var functionDeclaration = <Declarations.Function> statements.next()
				this.expect(functionDeclaration.getSymbol(), Is.Equal().To("Empty"))
			})
			this.add("empty function with return type", () => {
				var handler = new Error.ConsoleHandler()
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("Empty: func -> Full\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var functionDeclaration = <Declarations.Function> statements.next()
				this.expect(functionDeclaration.getSymbol(), Is.Equal().To("Empty"))
				// TODO: Test return type once implemented
			})
		}
	}
	Unit.Fixture.add(new FunctionTest())
}
