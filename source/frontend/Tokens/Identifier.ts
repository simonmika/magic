import Token = require('./Token');

class Identifier extends Token {
	constructor(identifier: string) {
		super(identifier);
	}
}

export = Identifier;