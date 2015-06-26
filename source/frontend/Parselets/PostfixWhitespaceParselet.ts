import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Parser = require("./../Parser");
import InfixParselet = require("./InfixParselet");
import Expression = require("./../Expressions/Expression");
import PostfixWhitespaceExpression = require("./../Expressions/PostfixWhitespaceExpression");
import Precedence = require("./../Precedence");

class PostfixWhitespaceParselet implements InfixParselet
{
	constructor(private whitespace: TokenKind) {}
	
	parse(parser: Parser, left: Expression, token: Token) {
		return new PostfixWhitespaceExpression(left, this.whitespace);
	}
	
	getPrecedence() {
		return Precedence.Whitespace;
	}
	
	getWhitespace() {
		return this.whitespace;
	}
}

export = PostfixWhitespaceParselet;