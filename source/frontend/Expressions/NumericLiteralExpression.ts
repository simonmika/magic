import Expression = require("./Expression");
import PrefixExpression = require("./PrefixExpression");
import Parser = require("./../Parser");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Precedence = require("./../Precedence");

class NumericLiteralExpression implements PrefixExpression
{
	constructor(private value: string = null) {}
	
	parse(parser: Parser, token: Token) {
		return new NumericLiteralExpression(token.getValue());
	}
	
	getPrecedence() {
		return Precedence.Zero;
	}
	
	getValue() {
		return this.value;
	}
	
	toString() {
		return this.value;
	}
}

export = NumericLiteralExpression;