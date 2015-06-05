import Token = require('./Token');

class IntegerLiteral extends Token {
	
	constructor(private value: number) {
		super(value.toString());
	}
	
	getValue() {
		return this.value;
	}
}

export = IntegerLiteral;