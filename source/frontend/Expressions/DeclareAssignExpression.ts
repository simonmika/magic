import Expression = require("./Expression");
import InfixExpression = require("./InfixExpression");
import IdentifierExpression = require(".//IdentifierExpression");
import Parser = require("./../Parser");
import Token = require("./../Token");
import Precedence = require("./../Precedence");

import PostfixWhitespaceExpression = require("./PostfixWhitespaceExpression");
import PrefixWhitespaceExpression = require("./PrefixWhitespaceExpression");

class DeclareAssignExpression implements InfixExpression
{
	constructor(private identifier: string = null,
				private leftExpression: Expression = null,
				private rightExpression: Expression = null) {}
				
	parse(parser: Parser, left: Expression, token: Token) {
		var right = parser.parse(this.getPrecedence() - 1);
		return new DeclareAssignExpression(left.toString().trim(), left, right);
	}
	
	getLeftExpression() {
		return this.leftExpression;
	}
	
	getRightExpression() {
		return this.rightExpression;
	}
				
	getIdentifier() {
		return this.identifier;
	}
	
	getPrecedence() {
		return Precedence.Declaration;
	}
	
	toString() {
		return this.leftExpression + ":=" + this.rightExpression;
	}
}

export = DeclareAssignExpression;