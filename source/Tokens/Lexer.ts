/// <reference path="../Utilities/Iterator" />
/// <reference path="../IO/Position" />
/// <reference path="../IO/Location" />
/// <reference path="../IO/Region" />
/// <reference path="../IO/Reader" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />
/// <reference path="EndOfFile" />
/// <reference path="Identifier" />
/// <reference path="Comment" />
/// <reference path="Literal" />
/// <reference path="Literals/String" />
/// <reference path="Separator" />
/// <reference path="Whitespace" />

module Magic.Tokens {
	export class Lexer implements Utilities.Iterator<Token> {
		private reader: IO.BufferedReader
		constructor(reader: IO.Reader) {
			this.reader = new IO.BufferedReader(reader)
		}
		next(): Token {
			var result: Token = null
			if (!(
				(result = EndOfFile.scan(this.reader)) ||
				(result = Whitespace.scan(this.reader)) ||
				(result = Comment.scan(this.reader)) ||
				(result = Separator.scan(this.reader)) ||
				(result = Operator.scan(this.reader)) ||
				(result = Literals.String.scan(this.reader)) ||
				(result = Identifier.scan(this.reader)) ||
				false
			))
				throw "Lexical Error: Failed to tokenize " + this.reader.peek(5) + " @ " + this.reader.getLocation();
			return result
		}
	}
}
