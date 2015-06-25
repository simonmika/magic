import Expression = require("./Expression");
import TokenKind = require("./../TokenKind");
import Operator = require("./../Operator");

class PostfixOperatorExpression implements Expression
{
	constructor(private left: Expression, private operator: TokenKind) {}
	
	getLeft() {
		return this.left;
	}
	
	getOperator() {
		return this.operator;
	}
	
	toString() {
		return this.left.toString() + Operator.toString(this.operator);
	}
	
}

export = PostfixOperatorExpression;