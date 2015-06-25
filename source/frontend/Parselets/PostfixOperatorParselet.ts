import Token = require("./../Tokens/Token");
import TokenKind = require("./../Tokens/TokenKind");
import Parser = require("./../Parser");
import Expression = require("./../Expressions/Expression");
import InfixParselet = require("./InfixParselet");
import PostfixOperatorExpression = require("./../Expressions/PostfixOperatorExpression");

class PostfixOperatorParselet implements InfixParselet
{
	constructor(private operator: TokenKind, private precedence: number){}
	
	parse(parser: Parser, left: Expression, token: Token) {
		return new PostfixOperatorExpression(left, this.operator);
	}
	
	getOperator() {
		return this.operator;
	}
	
	getPrecedence() {
		return this.precedence;
	}
}

export = InfixParselet;