import Token = require('./Token');
import TokenKind = require("./TokenKind");

class Identifier extends Token {
	constructor(identifier: string) {
		super(identifier, TokenKind.Identifier);
	}
}

export = Identifier;