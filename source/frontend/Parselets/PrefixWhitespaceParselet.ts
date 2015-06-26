import PrefixParselet = require("./PrefixParselet");
import Expression = require("./../Expressions/Expression");
import PrefixWhitespaceExpression = require("./../Expressions/PrefixWhitespaceExpression");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Parser = require("./../Parser");
import Precedence = require("./../Precedence");

class PrefixWhitespaceParselet implements PrefixParselet
{
	constructor(private whitespace: TokenKind) {}
	
	parse(parser: Parser, token: Token) {
		var right = parser.parse(this.getPrecedence());
		return new PrefixWhitespaceExpression(this.whitespace, right);
	}
	
	getWhitespace() {
		return this.whitespace;
	}
	
	getPrecedence() {
		return Precedence.Whitespace;
	}
	
}

export = PrefixWhitespaceParselet;