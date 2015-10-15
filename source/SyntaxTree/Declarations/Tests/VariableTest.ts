/// <reference path="../../../Error/ConsoleHandler" />
/// <reference path="../../../Error/Position" />
/// <reference path="../../../Error/Location" />
/// <reference path="../../../Error/Region" />
/// <reference path="../../../Error/Handler" />
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
				var variableDeclaration = this.createDeclaration("i: Int\n", handler)
				this.expect(variableDeclaration.getSymbol(), Is.Equal().To("i"))
				this.expect((<Type.Identifier>variableDeclaration.getType()).getName(), Is.Equal().To("Int"))
			})
			this.add("static variable", () => {
				var variableDeclaration = this.createDeclaration("i: static Int\n", handler)
				this.expect(variableDeclaration.getSymbol(), Is.Equal().To("i"))
				this.expect(variableDeclaration.isStatic(), Is.True())
				this.expect((<Type.Identifier>variableDeclaration.getType()).getName(), Is.Equal().To("Int"))
			})
			this.add("constant", () => {
				var variableDeclaration = this.createDeclaration("i: const Int\n", handler)
				this.expect(variableDeclaration.getSymbol(), Is.Equal().To("i"))
				this.expect(variableDeclaration.isConstant(), Is.True())
				this.expect((<Type.Identifier>variableDeclaration.getType()).getName(), Is.Equal().To("Int"))
			})
			this.add("static const", () => {
				var variableDeclaration = this.createDeclaration("i: static const Int\n", handler)
				this.expect(variableDeclaration.getSymbol(), Is.Equal().To("i"))
				this.expect(variableDeclaration.isStatic(), Is.True())
				this.expect(variableDeclaration.isConstant(), Is.True())
				this.expect((<Type.Identifier>variableDeclaration.getType()).getName(), Is.Equal().To("Int"))
			})
		}
		createDeclaration(sourceString: string, errorHandler: Error.Handler): Declarations.Variable {
			var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader(sourceString), errorHandler)), errorHandler)
			var statements = parser.next().getStatements()
			return <Declarations.Variable> statements.next()
		}
	}
	Unit.Fixture.add(new VariableTest())
}
