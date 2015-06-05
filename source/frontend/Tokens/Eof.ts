import Token = require("./Token");

class Eof extends Token
{
	constructor() {
		super("EOF");
	}
}

export = Eof;