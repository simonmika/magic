import Token = require("./../Tokens/Token");
import Parser = require("./../Parser");
import Expression = require("./../Expressions/Expression");

interface InfixParselet
{
	parse(parser: Parser, left: Expression, token: Token): Expression;
	getPrecedence(): number;
}

export = InfixParselet;