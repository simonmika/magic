import Token = require("./Token");
import TokenKind = require("./TokenKind");

class LeftParanthesis extends Token
{
	constructor() {
		super("(", TokenKind.SeparatorLeftParanthesis);
	}
}

export = LeftParanthesis;