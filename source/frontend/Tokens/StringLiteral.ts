import Token = require('./Token');
import TokenKind = require("./TokenKind");

class StringLiteral extends Token {
	constructor(value: string) {
		super(value, TokenKind.LiteralString);
	}
}

export = StringLiteral;