import Token = require("./../Tokens/Token");
import TokenKind = require("./../Tokens/TokenKind");

class Expression
{
	constructor(private operator: Token, private kind: TokenKind) {}
}

export = Expression;