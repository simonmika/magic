import Token = require("./Token");
import TokenKind = require("./TokenKind");

class Colon extends Token
{
	constructor() {
		super(":", TokenKind.SeparatorColon);
	}
}

export = Colon;