import Expression = require("./Expression");
import TokenKind = require("./../Tokens/TokenKind");

class InfixOperatorExpression implements Expression
{
	constructor(private left: Expression, private operator: TokenKind, private right: Expression) {}
	
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
		return "(" + this.left.toString() + this.operator.toString() + this.right.toString() + ")";
	}	
}

export = InfixOperatorExpression;