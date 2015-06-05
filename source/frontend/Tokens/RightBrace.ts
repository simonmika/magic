import Token = require('./Token');
import TokenKind = require("./TokenKind");

class RightBrace extends Token {
	constructor() {
		super("}", TokenKind.SeparatorRightBrace);
	}
}

export = RightBrace;