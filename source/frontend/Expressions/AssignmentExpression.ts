import Expression = require("./Expression");

class AssignmentExpression implements Expression
{
	constructor(private identifier: string, private right: Expression) {}
	
	getIdentifier() {
		return this.identifier;
	}
	
	toString() {
		return this.identifier + "=" + this.right.toString();
	}	
}

export = AssignmentExpression;