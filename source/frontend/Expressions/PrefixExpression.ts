import Expression = require("./Expression");
import Token = require("./../Token");
import Parser = require("./../Parser");

interface PrefixExpression extends Expression
{
	parse(parser: Parser, token: Token): Expression;
}

export = PrefixExpression;