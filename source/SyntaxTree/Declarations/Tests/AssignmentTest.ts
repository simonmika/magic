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
/// <reference path="../Assignment" />
/// <reference path="../../Type/Name" />
/// <reference path="../../Expressions/Identifier" />
/// <reference path="../../Expressions/Literals/NumberLiteral" />

module Magic.SyntaxTree.Declarations.Tests {
	import Is = Unit.Constraints.Is
	export class AssignmentTest extends Unit.Fixture {
		constructor() {
			super("SyntaxTree.Declarations.Assignment")
			var handler = new Error.ConsoleHandler()
			this.add("a := b", () => {
				var declareAssignStatement = this.createDeclaration("a := b", handler)
				this.expect(declareAssignStatement.getLeft().getName(), Is.Equal().To("a"))
				this.expect((<Expressions.Identifier>declareAssignStatement.getRight()).getName(), Is.Equal().To("b"))
			})
			this.add("foo: Type = bar", () => {
				var declareAssignStatement = this.createDeclaration("foo: Type = bar", handler)
				this.expect(declareAssignStatement.getLeft().getName(), Is.Equal().To("foo"))
				this.expect(declareAssignStatement.getType().getName(), Is.Equal().To("Type"))
				this.expect((<Expressions.Identifier>declareAssignStatement.getRight()).getName(), Is.Equal().To("bar"))
			})
			this.add("foo: Float = 0.50f", () => {
				var declareAssignStatement = this.createDeclaration("f: Float = 0.50f", handler)
				this.expect(declareAssignStatement.getLeft().getName(), Is.Equal().To("f"))
				this.expect(declareAssignStatement.getType().getName(), Is.Equal().To("Float"))
				this.expect((<Expressions.Literals.NumberLiteral>declareAssignStatement.getRight()).getValue(), Is.Equal().To(0.5))
			})
		}
		createDeclaration(sourceString: string, errorHandler: Error.Handler): Declarations.Assignment {
			var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader(sourceString), errorHandler)), errorHandler)
			var statements = parser.next().getStatements()
			return <Declarations.Assignment> statements.next()
		}
	}
	Unit.Fixture.add(new AssignmentTest())
}
