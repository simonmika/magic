/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../Error/Position" />
/// <reference path="../../Error/Location" />
/// <reference path="../../Error/Region" />
/// <reference path="../../IO/BufferedReader" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Tokens/Lexer" />
/// <reference path="../../Tokens/GapRemover" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Parser" />
/// <reference path="../Module" />
/// <reference path="../Declarations/Class" />


module Magic.SyntaxTree.Tests {
	import Is = Unit.Constraints.Is
	export class ClassTest extends Unit.Fixture {
		constructor() {
			super("SyntaxTree.Class")
			this.add("empty class", () => {
				var handler = new Error.ConsoleHandler()
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("empty: class {\n}\n"), handler)), handler)
				var module = parser.next()
				var classDeclaration = <Declarations.Class> module.getStatements().next()
				this.expect(classDeclaration, Is.Not().NullOrUndefined())
				this.expect(classDeclaration.getSymbol(), Is.Equal().To("empty"))
			})
		}
	}
	Unit.Fixture.add(new ClassTest())
}
