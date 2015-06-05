import Token = require('./Token');
import TokenKind = require("./TokenKind");

class RightBracket extends Token {
	constructor() {
		super("]", TokenKind.SeparatorRightBracket);
	}
}

export = RightBracket;