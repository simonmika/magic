/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../GapRemover" />
/// <reference path="../Token" />
/// <reference path="../EndOfFile" />
/// <reference path="../Lexer" />
/// <reference path="../Operator" />
/// <reference path="../Identifier" />

module Magic.Tokens.Tests {
	export class GapRemoverTest extends Unit.Fixture {
		constructor() {
			super("GapRemover")
			var errorHandler = new Error.ConsoleHandler()
			this.add("common expression", () => {
				var testString = "\t\ta := b / c\n"
				var lexer = new Tokens.Lexer(new IO.StringReader(testString), errorHandler)
				var gapRemover = new GapRemover(lexer)
				var token: Token
				this.expect((token = gapRemover.next()) instanceof Identifier && (<Identifier>token).getName() === "a")
				this.expect((token = gapRemover.next()) instanceof Operator && (<Operator>token).getSymbol() === ":=")
				this.expect((token = gapRemover.next()) instanceof Identifier && (<Identifier>token).getName() === "b")
				this.expect((token = gapRemover.next()) instanceof Operator && (<Operator>token).getSymbol() === "/")
				this.expect((token = gapRemover.next()) instanceof Identifier && (<Identifier>token).getName() === "c")
			})
			this.add("verify gaps", () => {
				var testString = "\t\t\ta := b**c\t\n"
				var lexer = new Tokens.Lexer(new IO.StringReader(testString), errorHandler)
				var gapRemover = new GapRemover(lexer)
				var token: Token
				// PRE-GAP:	"\t\t\t"
				// POST-GAP: " "
				this.expect((token = gapRemover.next()) instanceof Identifier && (<Identifier>token).getName() === "a")
				this.expect((<Identifier>token).getPregap()[0].getRegion().getContent() === "\t\t\t")
				this.expect((<Identifier>token).getPostgap()[0].getRegion().getContent() === " ")
				// PRE-GAP: <none>
				// POST-GAP: " "
				this.expect((token = gapRemover.next()) instanceof Operator && (<Operator>token).getSymbol() === ":=")
				this.expect((<Operator>token).getPregap().length === 0)
				this.expect((<Operator>token).getPostgap()[0].getRegion().getContent() === " ")
				// PRE-GAP: <none>
				// POST-GAP: <none>
				this.expect((token = gapRemover.next()) instanceof Identifier && (<Identifier>token).getName() === "b")
				this.expect((<Identifier>token).getPregap().length === 0)
				this.expect((<Identifier>token).getPostgap().length === 0)
				// PRE-GAP: <none>
				// POST-GAP: <none>
				this.expect((token = gapRemover.next()) instanceof Operator && (<Operator>token).getSymbol() === "**")
				this.expect((<Operator>token).getPregap().length === 0)
				this.expect((<Operator>token).getPostgap().length === 0)
				// PRE-GAP: <none>
				// POST-GAP: "\t\n"
				this.expect((token = gapRemover.next()) instanceof Identifier && (<Identifier>token).getName() === "c")
				this.expect((<Identifier>token).getPregap().length === 0)
				this.expect((<Identifier>token).getPostgap()[0].getRegion().getContent() === "\t\n")
			})
		}
	}
}
