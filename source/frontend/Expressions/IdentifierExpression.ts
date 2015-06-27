import PrefixExpression = require("./PrefixExpression");
import Parser = require("./../Parser");
import Token = require("./../Token");
import Precedence = require("./../Precedence");

class IdentifierExpression implements PrefixExpression
{
	constructor(private value: string = null) {}
	
	parse(parser: Parser, token: Token) {
		return new IdentifierExpression(token.getValue());
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

export = IdentifierExpression;