import Token = require('./Token');
import TokenKind = require("./TokenKind");

class LeftBrace extends Token {
	constructor() {
		super("{", TokenKind.SeparatorLeftBrace);
	}
}

export = LeftBrace;