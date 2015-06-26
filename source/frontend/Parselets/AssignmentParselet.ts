import InfixParselet = require("./InfixParselet");
import Expression = require("./../Expressions/Expression");
import IdentifierExpression = require("./../Expressions/IdentifierExpression");
import AssignmentExpression = require("./../Expressions/AssignmentExpression");
import Parser = require("./../Parser");
import Token = require("./../Token");
import Precedence = require("./../Precedence");

class AssignmentParselet implements InfixParselet
{
	constructor() {}
	
	parse(parser: Parser, left: Expression, token: Token) {
		// 
		// How to deal with whitespaces here?
		//
		var right = parser.parse(this.getPrecedence() - 1);
		var identifier = (<IdentifierExpression>left).getValue();
		return new AssignmentExpression(identifier, right);
	}
	
	getPrecedence() {
		return Precedence.Assignment;
	}
}

export = AssignmentParselet;