import Token = require("./Token");
import TokenKind = require("./TokenKind");

class Operator extends Token
{
	private static operators = new Array<string>(
		"@",		/* */
		"+",		/* */
		"-",		/* */
		"*",		/* */
		"/",		/* */
		"**",		/* */
		"<<",		/* */
		">>",		/* */
		"^",		/* */
		"&",		/* */
		"&&",		/* */
		"|",		/* */
		"||",		/* */
		"+=",		/* */
		"-=",		/* */
		"*=",		/* */
		"/=",		/* */
		"**=",		/* */
		"<<=",		/* */
		">>=",		/* */
		"^=",		/* */
		"&=",		/* */
		"|=",		/* */
		"%",		/* */
		"=",		/* */
		"==",		/* */
		"<=",		/* */
		">=",		/* */
		"!=",		/* */
		"!",		/* */
		"<",		/* */
		">",		/* */
		"<=>",		/* */
		"~",		/* */
		"->",		/* */
		"=>",		/* */
		"?",		/* */
		"..",		/* */
		":=",		/* */
		":=="		/* */
	);
	
	constructor(op: string) {
		super(op, TokenKind.Operator);
	}
	
	static isOperator(op: string) {
		return Operator.operators.indexOf(op) > -1;
	}	
}

export = Operator;