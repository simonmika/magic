/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../GapRemover" />
/// <reference path="../Token" />
/// <reference path="../EndOfFile" />
/// <reference path="../Lexer" />
/// <reference path="../Operator" />
/// <reference path="../Identifier" />

module Magic.Tokens.Tests {
	import Is = Unit.Constraints.Is
	export class GapRemoverTest extends Unit.Fixture {
		constructor() {
			super("Tokens.GapRemover")
			var errorHandler = new Error.ConsoleHandler()
			this.add("common expression", () => {
				var testString = "\t\ta := b / c\n"
				var lexer = new Tokens.Lexer(new IO.StringReader(testString), errorHandler)
				var gapRemover = new GapRemover(lexer)
				var token: Token
				this.expect((token = gapRemover.next()) instanceof Identifier);
				this.expect((<Identifier>token).getName(), Is.Equal().To("a"))
				this.expect((token = gapRemover.next()) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To(":="))
				this.expect((token = gapRemover.next()) instanceof Identifier)
				this.expect((<Identifier>token).getName(), Is.Equal().To("b"))
				this.expect((token = gapRemover.next()) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("/"))
				this.expect((token = gapRemover.next()) instanceof Identifier)
				this.expect((<Identifier>token).getName(), Is.Equal().To("c"))
			})
			this.add("verify gaps", () => {
				var testString = "\t\t\ta := b**c\t\n"
				var lexer = new Tokens.Lexer(new IO.StringReader(testString), errorHandler)
				var gapRemover = new GapRemover(lexer)
				var token: Token
				// PRE-GAP:	"\t\t\t"
				// POST-GAP: " "
				this.expect((token = gapRemover.next()) instanceof Identifier)
				this.expect((<Identifier>token).getName(), Is.Equal().To("a"))
				this.expect((<Identifier>token).getPregap()[0].getRegion().getContent(), Is.Equal().To("\t\t\t"))
				this.expect((<Identifier>token).getPostgap()[0].getRegion().getContent(), Is.Equal().To(" "))
				// PRE-GAP: <none>
				// POST-GAP: " "
				this.expect((token = gapRemover.next()) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To(":="))
				this.expect((<Operator>token).getPregap().length, Is.Equal().To(0))
				this.expect((<Operator>token).getPostgap()[0].getRegion().getContent(), Is.Equal().To(" "))
				// PRE-GAP: <none>
				// POST-GAP: <none>
				this.expect((token = gapRemover.next()) instanceof Identifier)
				this.expect((<Identifier>token).getName(), Is.Equal().To("b"))
				this.expect((<Identifier>token).getPregap().length, Is.Equal().To(0))
				this.expect((<Identifier>token).getPostgap().length, Is.Equal().To(0))
				// PRE-GAP: <none>
				// POST-GAP: <none>
				this.expect((token = gapRemover.next()) instanceof Operator)
				this.expect((<Operator>token).getSymbol(), Is.Equal().To("**"))
				this.expect((<Operator>token).getPregap().length, Is.Equal().To(0))
				this.expect((<Operator>token).getPostgap().length, Is.Equal().To(0))
				// PRE-GAP: <none>
				// POST-GAP: "\t\n"
				this.expect((token = gapRemover.next()) instanceof Identifier)
				this.expect((<Identifier>token).getName(), Is.Equal().To("c"))
				this.expect((<Identifier>token).getPregap().length, Is.Equal().To(0))
				this.expect((<Identifier>token).getPostgap()[0].getRegion().getContent(), Is.Equal().To("\t\n"))
			})
		}
	}
	Unit.Fixture.add(new GapRemoverTest())
}
