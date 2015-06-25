import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Parser = require("./../Parser");
import InfixParselet = require("./InfixParselet");
import Expression = require("./../Expressions/Expression");
import PostfixOperatorExpression = require("./../Expressions/PostfixOperatorExpression");

class PostfixOperatorParselet implements InfixParselet
{
	constructor(private operator: TokenKind, private precedence: number) {}
	
	parse(parser: Parser, left: Expression, token: Token) {
		return new PostfixOperatorExpression(left, this.operator);
	}
	
	getPrecedence() {
		return this.precedence;
	}
	
	getOperator() {
		return this.operator;
	}
	
}

export = PostfixOperatorParselet;