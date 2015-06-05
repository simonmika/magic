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
		"->",		/* */
		"=>",		/* */
		"?",		/* */
		"..",		/* */
		":=",		/* */
		":=="		/* */
	);
	
	constructor(op: string) {
		super(op);
	}
	
	static isOperator(op: string) {
		return Operator.operators.indexOf(op) > -1;
	}	
}

export = Operator;