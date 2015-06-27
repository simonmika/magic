import Expression = require("./Expression");
import InfixExpression = require("./InfixExpression");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Parser = require("./../Parser");
import Whitespace = require("./../Whitespace");
import Precedence = require("./../Precedence");
import EndOfLineExpression = require("./EndOfLineExpression");

class PostfixWhitespaceExpression implements InfixExpression
{
	constructor(private whitespace: TokenKind,
				private leftExpression: Expression = null,
				private rightExpression: Expression = null) {}
	
	parse(parser: Parser, left: Expression, token: Token) {
		//var right = parser.parse(this.getPrecedence() - 1);
		return new PostfixWhitespaceExpression(this.whitespace, left);
	}

	getLeftExpression() {
		return this.leftExpression;
	}
	
	getRightExpression() {
		return this.rightExpression;
	}

	getPrecedence() {
		return Precedence.Whitespace;
	}

	toString() {
		var right = this.rightExpression === null ? "" : this.rightExpression.toString();
		return this.leftExpression + Whitespace.toString(this.whitespace) + right;
	}

}

export = PostfixWhitespaceExpression;