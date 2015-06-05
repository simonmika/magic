import Token = require('./Token');

class StringLiteral extends Token {
	constructor(value: string) {
		super(value);
	}
}

export = StringLiteral;