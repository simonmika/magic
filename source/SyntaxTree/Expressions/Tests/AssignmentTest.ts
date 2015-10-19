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
/// <reference path="../../Expressions/Assignment" />

module Magic.SyntaxTree.Tests {
	import Is = Unit.Constraints.Is
	export class AssignmentTest extends Unit.Fixture {
		constructor() {
			super("SyntaxTree.Expressions.Assignment")
			var handler = new Error.ConsoleHandler()
			this.add("literal", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("a = 10"), handler)), handler)
				var statements = parser.next().getStatements()
				var result = <Expressions.Assignment>statements.next()
				this.expect(result.getLeft().getName(), Is.Equal().To("a"))
				this.expect((<Expressions.Literal>result.getRight()).getLiteral().getRegion().getContent(), Is.Equal().To("10"))
			})
		}
	}
	Unit.Fixture.add(new AssignmentTest())
}
