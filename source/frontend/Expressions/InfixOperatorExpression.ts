import Expression = require("./Expression");
import InfixExpression = require("./InfixExpression");
import Parser = require("./../Parser");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Operator = require("./../Operator");

class InfixOperatorExpression implements InfixExpression
{
	constructor(private operator: TokenKind,
				private precedence: number,
				private rightAssociative: boolean = false,
				private left: Expression = null,
				private right: Expression = null) {}
	
	parse(parser: Parser, left: Expression, token: Token) {
		var right = parser.parse(this.precedence - (this.rightAssociative ? 1 : 0));
		return new InfixOperatorExpression(this.operator, this.precedence, this.rightAssociative, left, right);
	}
	
	getLeftExpression() {
		return this.left;
	}
	
	getRightExpression() {
		return this.right;
	}
	
	getOperator() {
		return this.operator;
	}
	
	getPrecedence() {
		return this.precedence;
	}
	
	isRightAssociative() {
		return this.rightAssociative;
	}
	
	toString() {
		var left = this.left === null ? "" : this.left.toString();
		var right = this.right === null ? "" : this.right.toString();
		return left + Operator.toString(this.operator) + right;
		//return "(" + left + Operator.toString(this.operator) + right + ")";
	}
	
}

export = InfixOperatorExpression;