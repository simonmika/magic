import Expression = require("./Expression");

class IdentifierExpression implements Expression
{
	constructor(private value: string) {}
	
	getValue() {
		return this.value;
	}
	
	toString() {
		return this.value;
	}
	
}

export = IdentifierExpression;