import Expression = require("./Expression");

class BooleanLiteralExpression implements Expression
{
	constructor(private value: string) {}
	
	getValue() {
		return this.value;
	}
	
	toString() {
		return this.value;
	}	
}

export = BooleanLiteralExpression;