import Expression = require("./Expression");

class BinaryExpression extends Expression
{
	constructor(private left: Expression, private right: Expression) {
		super();
	}
}

export = BinaryExpression;