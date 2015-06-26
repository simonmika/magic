import InfixParselet = require("./InfixParselet");
import Expression = require("./../Expressions/Expression");
import InfixOperatorExpression = require("./../Expressions/InfixOperatorExpression");
import Parser = require("./../Parser");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");

class InfixOperatorParselet implements InfixParselet
{
	constructor(private operator: TokenKind,
				private precedence: number,
				private rightAssociative = false) {}
	
	parse(parser: Parser, left: Expression, token: Token)
	{
		var right = parser.parse(this.precedence - (this.rightAssociative ? 1 : 0));
		return new InfixOperatorExpression(left, this.operator, right);
	}
	
	getPrecedence() {
		return this.precedence;
	}
	
	getOperator() {
		return this.operator;
	}
	
	isRightAssociative() {
		return this.rightAssociative;
	}
}

export = InfixOperatorParselet;