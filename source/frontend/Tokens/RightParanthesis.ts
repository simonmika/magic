import Token = require('./Token');
import TokenKind = require("./TokenKind");

class RightParanthesis extends Token {
	constructor() {
		super(")", TokenKind.SeparatorRightParanthesis);
	}
}

export = RightParanthesis;