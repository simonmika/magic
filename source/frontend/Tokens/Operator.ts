import Token = require("./Token");

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
		"implicit",	/* */
		"as",		/* */
		"->",		/* */
		"=>",		/* */
		"?"			/* */
	);
	
	constructor(op: string) {
		super(op);
	}
	
	static isOperator(op: string) {
		return Operator.operators.indexOf(op);
	}
	
}

export = Operator;