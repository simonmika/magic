import Token = require('./Token');
import TokenKind = require("./TokenKind");

class LeftBracket extends Token {
	constructor() {
		super("[", TokenKind.SeparatorLeftBracket);
	}
}

export = LeftBracket;