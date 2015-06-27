import Expression = require("./Expression");
import InfixExpression = require("./InfixExpression");
import Parser = require("./../Parser");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Precedence = require("./../Precedence");

class ConditionalExpression implements InfixExpression
{
	constructor(private conditionExpression: Expression = null,
				private thenExpression: Expression = null,
				private elseExpression: Expression = null)
	{}
	
	parse(parser: Parser, left: Expression, token: Token) {
		var thenExpression = parser.parse();
		parser.expect(TokenKind.SeparatorColon);
		var elseExpression = parser.parse();
		return new ConditionalExpression(left, thenExpression, elseExpression);
	}
	
	getLeftExpression() {
		return null;
	}
	
	getRightExpression() {
		return null;
	}
	
	getConditionExpression() {
		return this.conditionExpression;
	}
	
	getThenExpression() {
		return this.getThenExpression;
	}
	
	getElseExpression() {
		return this.elseExpression;
	}
	
	getPrecedence() {
		return Precedence.Conditional;
	}
	
	toString() {
		return this.conditionExpression + "?" + this.thenExpression + ":" + this.elseExpression;
	}
}

export = ConditionalExpression;