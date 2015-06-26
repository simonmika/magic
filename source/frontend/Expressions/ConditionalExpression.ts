import Expression = require("./Expression");

//
// Represents a ternary if.
// Example: condition ? true : false
//
class ConditionalExpression implements Expression
{
	constructor(private condition: Expression,
				private thenExpression: Expression,
				private elseExpression: Expression)
	{}
		
	getCondition() {
		return this.condition;
	}
	
	getThen() {
		return this.thenExpression;
	}
	
	getElse() {
		return this.elseExpression;
	}
	
	toString() {
		return  this.condition.toString() + "?" +
				this.thenExpression.toString() + ":" +
				this.elseExpression.toString();
	}
	
}

export = ConditionalExpression;