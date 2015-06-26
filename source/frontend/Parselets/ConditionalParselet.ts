import InfixParselet = require("./InfixParselet");
import Expression = require("./../Expressions/Expression");
import ConditionalExpression = require("./../Expressions/ConditionalExpression");
import Parser = require("./../Parser");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Precedence = require("./../Precedence");

class ConditionalParselet implements InfixParselet
{
	constructor() {}
	
	parse(parser: Parser, left: Expression, token: Token) {
		var thenExpression = parser.parse();
		parser.expect(TokenKind.SeparatorColon);
		var elseExpression = parser.parse(0);
		return new ConditionalExpression(left, thenExpression, elseExpression);
	}
	
	getPrecedence() {
		return Precedence.Conditional;
	}
	
}

export = ConditionalParselet;