import Expression = require("./Expression");

class NumericLiteralExpression implements Expression
{
	constructor(private value: string) {}
	
	getValue() {
		return this.value;
	}
	
	toString() {
		return this.value;
	}	
}

export = NumericLiteralExpression;