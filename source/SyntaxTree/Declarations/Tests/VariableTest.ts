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
/// <reference path="../../Declarations/Variable" />
/// <reference path="../../Type/Identifier" />
/// <reference path="../../Type/Tuple" />

module Magic.SyntaxTree.Tests {
	import Is = Unit.Constraints.Is
	export class VariableTest extends Unit.Fixture {
		constructor() {
			super("SyntaxTree.Declarations.Variable")
			var handler = new Error.ConsoleHandler()
			this.add("simple declaration", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("i: Int\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var variableDeclaration = <Declarations.Variable> statements.next()
				this.expect(variableDeclaration.getSymbol(), Is.Equal().To("i"))
				this.expect((<Type.Identifier>variableDeclaration.getType()).getName(), Is.Equal().To("Int"))
			})
			this.add("static variable", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("i: static Int\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var variableDeclaration = <Declarations.Variable> statements.next()
				this.expect(variableDeclaration.getSymbol(), Is.Equal().To("i"))
				this.expect(variableDeclaration.isStatic(), Is.True())
				this.expect((<Type.Identifier>variableDeclaration.getType()).getName(), Is.Equal().To("Int"))
			})
			this.add("constant", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("i: const Int\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var variableDeclaration = <Declarations.Variable> statements.next()
				this.expect(variableDeclaration.getSymbol(), Is.Equal().To("i"))
				this.expect(variableDeclaration.isConstant(), Is.True())
				this.expect((<Type.Identifier>variableDeclaration.getType()).getName(), Is.Equal().To("Int"))
			})
			this.add("static const", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("i: static const Int\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var variableDeclaration = <Declarations.Variable> statements.next()
				this.expect(variableDeclaration.getSymbol(), Is.Equal().To("i"))
				this.expect(variableDeclaration.isStatic(), Is.True())
				this.expect(variableDeclaration.isConstant(), Is.True())
				this.expect((<Type.Identifier>variableDeclaration.getType()).getName(), Is.Equal().To("Int"))
			})
		}
	}
	Unit.Fixture.add(new VariableTest())
}
