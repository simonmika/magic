import Expression = require("./Expression");
import PrefixExpression = require("./PrefixExpression");
import Parser = require("./../Parser");
import Token = require("./../Token");
import TokenKind = require("./../TokenKind");
import Operator = require("./../Operator");

class PrefixOperatorExpression implements PrefixExpression
{
	constructor(private operator: TokenKind,
				private precedence: number,
				private right: Expression = null) {}
	
	parse(parser: Parser, token: Token) {
		return new PrefixOperatorExpression(this.operator,this.precedence, parser.parse(this.precedence));
	}
	
	getRightExpression() {
		return this.right;
	}
	
	getPrecedence() {
		return this.precedence;
	}
	
	toString() {
		return Operator.toString(this.operator) + this.right;
	}
}

export = PrefixOperatorExpression;