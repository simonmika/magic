import Token = require("./Token");
import TokenKind = require("./TokenKind");

class Comma extends Token
{
	constructor() {
		super(",", TokenKind.SeparatorComma);
	}
}

export = Comma;