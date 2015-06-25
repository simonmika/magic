import Token = require("./../Tokens/Token");
import TokenKind = require("./../Tokens/TokenKind");
import Parser = require("./../Parser");
import Expression = require("./../Expressions/Expression");
import InfixParselet = require("./InfixParselet");
import InfixOperatorExpression = require("./../Expressions/InfixOperatorExpression");

class InfixOperatorParselet implements InfixParselet
{
	constructor(private operator: TokenKind, private precedence: number, private rightAssociative: boolean = false){}
	
	parse(parser: Parser, left: Expression, token: Token) {
		var right = parser.parse(this.getPrecedence() - (this.isRightAssociative ? 1 : 0));
		return new InfixOperatorExpression(left, this.operator, right);
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
}

export = InfixParselet;