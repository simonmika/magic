import Expression = require("./Expression");
import TokenKind = require("./../TokenKind");
import Operator = require("./../Operator");

class InfixOperatorExpression implements Expression
{
	constructor(private left: Expression,
				private operator: TokenKind,
				private right: Expression) {}
	
	getLeft() {
		return this.left;
	}
	
	getRight() {
		return this.right;
	}
	
	getOperator() {
		return this.operator;
	}
		
	toString() {
		return "(" + this.left.toString() + Operator.toString(this.operator) + this.right.toString() + ")";
	}
	
}

export = InfixOperatorExpression;