import Expression = require("./Expression");
import TokenKind = require("./../Tokens/TokenKind");

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
		return this.left.toString() + this.operator.toString();
	}	
}

export = PostfixOperatorExpression;