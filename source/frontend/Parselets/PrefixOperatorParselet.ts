import PrefixParselet = require("./PrefixParselet");
import PrefixOperatorExpression = require("./../Expressions/PrefixOperatorExpression");
import Parser = require("./../Parser");
import Token = require("./../Tokens/Token");
import TokenKind = require("./../Tokens/TokenKind");

class PrefixOperatorParselet implements PrefixParselet
{
	constructor(private operator: TokenKind, private precedence: number) {}
	
	parse(parser: Parser, token: Token) {
		var right = parser.parse(this.precedence);
		return new PrefixOperatorExpression(this.operator, right);
	}
	
	getOperator() {
		return this.operator;
	}
	
	getPrecedence() {
		return this.precedence;
	}
	
}

export = PrefixOperatorParselet;