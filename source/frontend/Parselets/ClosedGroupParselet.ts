import PrefixParselet = require("./PrefixParselet");
import Expression = require("./../Expressions/Expression");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Parser = require("./../Parser");

class ClosedGroupParselet implements PrefixParselet
{
	constructor(private closingKind: TokenKind) {}
	
	parse(parser: Parser, token: Token) {
		var interiorExpression = parser.parse();
		parser.expect(this.closingKind);
		return interiorExpression;
	}
}

export = ClosedGroupParselet;