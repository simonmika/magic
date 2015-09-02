/// <reference path="../Error/Handler" />
/// <reference path="../Utilities/Iterator" />
/// <reference path="../IO/Reader" />
/// <reference path="Source" />
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
		private source: Source
		constructor(reader: IO.Reader, private errorHandler: Error.Handler) {
			this.source = new Source(reader, errorHandler)
		}
		next(): Token {
			var result: Token = null
			if (!(
				(result = EndOfFile.scan(this.source)) ||
				(result = Whitespace.scan(this.source)) ||
				(result = Comment.scan(this.source)) ||
				(result = Operator.scan(this.source)) ||
				(result = Separator.scan(this.source)) ||
				(result = Literals.String.scan(this.source)) ||
				(result = Literals.Number.scan(this.source)) ||
				(result = Identifier.scan(this.source)) ||
				false
			))
				this.source.raise("[Lexer]: Unrecognized token.");
			return result
		}
	}
}
