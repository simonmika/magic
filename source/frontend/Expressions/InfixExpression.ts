import Expression = require("./Expression");
import Token = require("./../Token");
import Parser = require("./../Parser");

interface InfixExpression extends Expression
{
	parse(parser: Parser, left: Expression, token: Token): Expression;
	getLeftExpression(): Expression;
	getRightExpression(): Expression;
}

export = InfixExpression;