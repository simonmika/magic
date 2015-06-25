import Token = require("./../Tokens/Token");
import Parser = require("./../Parser");
import Expression = require("./../Expressions/Expression");

interface PrefixParselet
{
	parse(parser: Parser, token: Token): Expression;
}

export = PrefixParselet;