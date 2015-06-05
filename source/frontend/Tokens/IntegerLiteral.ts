import Token = require('./Token');
import TokenKind = require("./TokenKind");

class IntegerLiteral extends Token {
	
	constructor(private value: number) {
		super(value.toString(), TokenKind.LiteralInteger);
	}
	
	getValue() {
		return this.value;
	}
}

export = IntegerLiteral;