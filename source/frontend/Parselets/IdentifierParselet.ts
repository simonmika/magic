import PrefixParselet = require("./PrefixParselet");
import Parser = require("./../Parser");
import Token = require("./../Token");
import IdentifierExpression = require("./../Expressions/IdentifierExpression");

class IdentifierParselet implements PrefixParselet
{
	constructor() {}
	
	parse(parser: Parser, token: Token) {
		return new IdentifierExpression(token.getValue());
	}
}

export = IdentifierParselet;