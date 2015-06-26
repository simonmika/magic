import Expression = require("./Expression");
import TokenKind = require("./../TokenKind");
import Whitespace = require("./../Whitespace");

class PostfixWhitespaceExpression implements Expression
{
	constructor(private left: Expression, private whitespace: TokenKind) {}
	
	getLeft() {
		return this.left;
	}
	
	getWhitespace() {
		return this.whitespace;
	}
	
	toString() {
		return this.left.toString() + Whitespace.toString(this.whitespace);
	}
	
}

export = PostfixWhitespaceExpression;