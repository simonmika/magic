import Expression = require("./../Expressions/Expression");
import TokenKind = require("./../TokenKind");
import Whitespace = require("./../Whitespace");

class PrefixWhitespaceExpression implements Expression
{
	constructor(private whitespace: TokenKind, private right: Expression) {}
	
	getRight() {
		return this.right;
	}
	
	getWhitespace() {
		return this.whitespace;
	}
	
	toString() {
		return Whitespace.toString(this.whitespace) + this.right.toString();
	}
}

export = PrefixWhitespaceExpression;