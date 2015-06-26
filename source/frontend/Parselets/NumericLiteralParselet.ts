import PrefixParselet = require("./PrefixParselet");
import Parser = require("./../Parser");
import Token = require("./../Token");
import NumericLiteralExpression = require("./../Expressions/NumericLiteralExpression");

class NumericLiteralParselet implements PrefixParselet
{
	constructor() {}
	
	parse(parser: Parser, token: Token) {
		return new NumericLiteralExpression(token.getValue());
	}
}

export = NumericLiteralParselet;