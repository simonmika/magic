import Token = require('./Token');

class LeftBrace extends Token {
	constructor() {
		super("{");
	}
}

export = LeftBrace;