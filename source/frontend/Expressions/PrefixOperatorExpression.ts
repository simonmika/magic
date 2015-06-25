import Expression = require("./Expression");
import TokenKind = require("./../Tokens/TokenKind");

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
		return this.operator.toString() + this.right.toString();
	}
}

export = PrefixOperatorExpression;