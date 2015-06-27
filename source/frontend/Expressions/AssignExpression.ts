import Expression = require("./Expression");
import InfixExpression = require("./InfixExpression");
import IdentifierExpression = require(".//IdentifierExpression");
import Parser = require("./../Parser");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Precedence = require("./../Precedence");

import PostfixWhitespaceExpression = require("./PostfixWhitespaceExpression");
import PrefixWhitespaceExpression = require("./PrefixWhitespaceExpression");


class AssignExpression implements InfixExpression
{
	constructor(private identifier: string = null,
				private leftExpression: Expression = null,
				private rightExpression: Expression = null) {}
				
	parse(parser: Parser, left: Expression, token: Token) {
		
		var identifier: string;
		
		// Need to check for whitespaces and if found, strip them from the identifier name.
		// The expression itself is kept intact.
		/*if(left instanceof PrefixWhitespaceExpression) {
			console.log("AssignmentExpression: prefix whitespace");
		} else if(left instanceof PostfixWhitespaceExpression) {
			identifier = (<PostfixWhitespaceExpression>left).toString().trim();
		} else if(left instanceof IdentifierExpression) {
			identifier = (<IdentifierExpression>left).getValue();
		} else {
			throw new Error("invalid pre/postfix expression - expected whitespace or identifier.");
		}*/

		var right = parser.parse(this.getPrecedence() - 1);
		return new AssignExpression(left.toString().trim(), left, right);
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
		return Precedence.Assignment;
	}
	
	toString() {
		return this.leftExpression + "=" + this.rightExpression;
	}
	
}

export = AssignExpression;