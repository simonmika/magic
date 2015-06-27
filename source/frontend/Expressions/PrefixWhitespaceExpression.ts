import Expression = require("./Expression");
import PrefixExpression = require("./PrefixExpression");
import Parser = require("./../Parser");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Whitespace = require("./../Whitespace");
import Precedence = require("./../Precedence");

class PrefixWhitespaceExpression implements PrefixExpression
{
	constructor(private whitespace: TokenKind,
				private right: Expression = null) {}
	
	parse(parser: Parser, token: Token) {
		return new PrefixWhitespaceExpression(this.whitespace, parser.parse(this.getPrecedence()));
	}
	
	getRightExpression() {
		return this.right;
	}
	
	getPrecedence() {
		return Precedence.Whitespace;
	}
	
	toString() {
		return Whitespace.toString(this.whitespace) + this.right;
	}
}

export = PrefixWhitespaceExpression;