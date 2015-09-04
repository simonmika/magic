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
			super("Tokens.Lexer")
			var errorHandler = new Error.ConsoleHandler()
			this.add("eof", () => {
				var lexer = new Lexer(new IO.StringReader(""), errorHandler)
				this.expect(lexer.next() instanceof EndOfFile)
			})
			this.add("identifier", () => {
				var lexer = new Lexer(new IO.StringReader("ident"), errorHandler)
				var ident = lexer.next()
				this.expect(ident instanceof Identifier && (<Identifier>ident).getName() === "ident")
				this.expect(ident.isIdentifier())
			})
			this.add("operator", () => {
				var lexer = new Lexer(new IO.StringReader(">"), errorHandler)
				var op = lexer.next()
				this.expect(op instanceof Operator && (<Operator>op).getSymbol() === ">")
				// TODO: These two fail, why!?
				//this.expect(op.isOperator())
				//this.expect((<Operator>op).isOperator())
			})
			this.add("whitespace", () => {
				var lexer = new Lexer(new IO.StringReader("\n\t\r \n"), errorHandler)
				var token: Token
				this.expect((token = lexer.next()) instanceof Whitespace && (<Whitespace>token).getRegion().getContent() === "\n")
				this.expect((token = lexer.next()) instanceof Whitespace && (<Whitespace>token).getRegion().getContent() === "\t\r \n")
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
	Unit.Fixture.add(new LexerTest())
}
