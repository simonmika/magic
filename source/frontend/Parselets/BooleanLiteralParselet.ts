import PrefixParselet = require("./PrefixParselet");
import Parser = require("./../Parser");
import Token = require("./../Token");
import BooleanLiteralExpression = require("./../Expressions/BooleanLiteralExpression");

class BooleanLiteralParselet implements PrefixParselet
{
	constructor() {}
	
	parse(parser: Parser, token: Token) {
		return new BooleanLiteralExpression(token.getValue());
	}
}

export = BooleanLiteralParselet;