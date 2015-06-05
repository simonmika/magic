import Token = require('./Token');

class FloatLiteral extends Token {
	
	constructor(private value: number) {
		super(value.toString());
	}
	
	getValue() {
		return this.value;
	}	
}

export = FloatLiteral;