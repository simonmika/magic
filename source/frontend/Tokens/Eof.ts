import Token = require("./Token");
import TokenKind = require("./TokenKind");

class Eof extends Token
{
	constructor() {
		super("EOF", TokenKind.Eof);
	}
}

export = Eof;