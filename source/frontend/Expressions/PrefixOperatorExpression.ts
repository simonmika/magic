import Expression = require("./../Expressions/Expression");
import TokenKind = require("./../TokenKind");
import Operator = require("./../Operator");

class PrefixOperatorExpression implements Expression
{
	constructor(private operator: TokenKind, private right: Expression) {}
	
	getRight() {
		return this.right;
	}
	
	getOperator() {
		return this.operator;
	}
	
	toString() {
		return Operator.toString(this.operator) + this.right.toString();
	}
}

export = PrefixOperatorExpression;