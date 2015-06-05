import Token = require('./Token');

class RightBrace extends Token {
	constructor() {
		super("}");
	}
}

export = RightBrace;