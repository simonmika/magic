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
		}
		createDeclaration(sourceString: string, errorHandler: Error.Handler): Declarations.Assignment {
			var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader(sourceString), errorHandler)), errorHandler)
			var statements = parser.next().getStatements()
			return <Declarations.Assignment> statements.next()
		}
	}
	Unit.Fixture.add(new AssignmentTest())
}
