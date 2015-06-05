import Token = require('./Token');
import TokenKind = require("./TokenKind");

class FloatLiteral extends Token {
	
	constructor(private value: number) {
		super(value.toString(), TokenKind.LiteralFloat);
	}
	
	getValue() {
		return this.value;
	}	
}

export = FloatLiteral;