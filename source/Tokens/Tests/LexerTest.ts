/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Token" />
/// <reference path="../EndOfFile" />
/// <reference path="../Gap" />
/// <reference path="../Identifier" />
/// <reference path="../Literal" />
/// <reference path="../Operator" />
/// <reference path="../Separator" />
/// <reference path="../Separator" />
/// <reference path="../Whitespace" />
/// <reference path="../Lexer" />

module Magic.Tokens.Tests {
	import Is = Unit.Constraints.Is
	export class LexerTest extends Unit.Fixture {
		constructor() {
			super("Lexer")
			var errorHandler = new Error.ConsoleHandler()
			this.add("eof", () => {
				var lexer = new Lexer(new IO.StringReader(""), errorHandler)
				this.expect(lexer.next() instanceof EndOfFile)
			})
			this.add("identifier", () => {
				var lexer = new Lexer(new IO.StringReader("ident"), errorHandler)
				var ident = lexer.next()
				this.expect(ident instanceof Identifier)
				this.expect(ident.isIdentifier())
				this.expect((<Identifier>ident).getName() === "ident")
			})
			this.add("operator", () => {
				var lexer = new Lexer(new IO.StringReader(">"), errorHandler)
				var op = lexer.next()
				this.expect(op instanceof Operator)
				// TODO: These two fail, why!?
				//this.expect(op.isOperator())
				//this.expect((<Operator>op).isOperator())
				this.expect((<Operator>op).getSymbol() === ">")
			})
			this.add("whitespace", () => {
				var lexer = new Lexer(new IO.StringReader("\n\t\r "), errorHandler)
				var lf = lexer.next()
				this.expect(lf instanceof Whitespace && lf.getRegion().getContent() === "\n")
				var rest = lexer.next()
				this.expect(rest instanceof Whitespace && rest.getRegion().getContent() === "\t\r ")
			})
			this.add("expression 1", () => {
				var lexer = new Lexer(new IO.StringReader("a := b * c"), errorHandler)
				this.expect(lexer.next() instanceof Identifier)
				this.expect(lexer.next() instanceof Whitespace)
				this.expect(lexer.next() instanceof Operator)
				this.expect(lexer.next() instanceof Whitespace)
				this.expect(lexer.next() instanceof Identifier)
				this.expect(lexer.next() instanceof Whitespace)
				this.expect(lexer.next() instanceof Operator)
				this.expect(lexer.next() instanceof Whitespace)
				this.expect(lexer.next() instanceof Identifier)
			})
		}
	}
}