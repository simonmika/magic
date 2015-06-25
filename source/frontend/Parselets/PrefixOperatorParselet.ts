import PrefixParselet = require("./PrefixParselet");
import Expression = require("./../Expressions/Expression");
import PrefixOperatorExpression = require("./../Expressions/PrefixOperatorExpression");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Parser = require("./../Parser");

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