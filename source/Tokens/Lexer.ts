/// <reference path="../Utilities/Iterator" />
/// <reference path="../IO/Position" />
/// <reference path="../IO/Location" />
/// <reference path="../IO/Region" />
/// <reference path="../IO/Reader" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />
/// <reference path="EndOfFile" />
/// <reference path="Identifier" />
/// <reference path="Keyword" />
/// <reference path="Literal" />
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
			while (!this.reader.isEmpty()) {
				result = Whitespace.scan(this.reader);
				if (!result)
					result = Separator.scan(this.reader);
			}
			return result
		}
	}
}
