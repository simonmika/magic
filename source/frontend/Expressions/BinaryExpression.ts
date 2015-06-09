import Token = require("./../Tokens/Token");
import TokenKind = require("./../Tokens/TokenKind");
import Expression = require("./Expression");

class BinaryExpression extends Expression
{
	constructor(token: Token, kind: TokenKind, private left: Expression, private right: Expression) {
		super(token, kind);
	}
}

export = BinaryExpression;