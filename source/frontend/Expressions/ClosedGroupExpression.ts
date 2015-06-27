import PrefixExpression = require("./PrefixExpression");
import Expression = require("./../Expressions/Expression");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Parser = require("./../Parser");
import Precedence = require("./../Precedence");
import Separator = require("./../Separator");

class ClosedGroupExpression implements PrefixExpression
{
	constructor(private closingKind: TokenKind,
				private interiorExpression: Expression = null) {}
	
	parse(parser: Parser, token: Token) {
		var interiorExpression = parser.parse();
		parser.expect(this.closingKind);
		return new ClosedGroupExpression(this.closingKind, interiorExpression);
	}
	
	getPrecedence() {
		return Precedence.Prefix;
	}
	
	toString() {
		var opener: TokenKind;
		switch(this.closingKind) {
			case TokenKind.SeparatorRightBracket:
				opener = TokenKind.SeparatorLeftBracket;
				break;
			case TokenKind.SeparatorRightCurly:
				opener = TokenKind.SeparatorLeftCurly;
				break;
			case TokenKind.SeparatorRightParanthesis:
				opener = TokenKind.SeparatorLeftParanthesis;
				break;
			default:
				throw new Error("invalid closing kind");
		}
		
		return Separator.toString(opener) + this.interiorExpression + Separator.toString(this.closingKind);
	}
	
}

export = ClosedGroupExpression;