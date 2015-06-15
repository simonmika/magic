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
		":=",		/* declare and assign */
		":==",		/* */
		"::="		/* create get-property */
	);
	
	constructor(op: string) {
		super(op, this.resolveKind(op));
	}
	
	static isOperator(op: string) {
		return Operator.operators.indexOf(op) > -1;
	}

	private resolveKind(op: string) {
		var result: TokenKind;
		switch(op) {
			case "@":
				result = TokenKind.OperatorDereference;
				break;
			case "+":
				result = TokenKind.OperatorAdd;
				break;
			case "-":
				result = TokenKind.OperatorSubtract;
				break;
			case "*":
				result = TokenKind.OperatorMultiply;
				break;
			case "/":
				result = TokenKind.OperatorDivide;
				break;
			case "**":
				result = TokenKind.OperatorExponent;
				break;
			case "<<":
				result = TokenKind.OperatorLeftShift;
				break;
			case ">>":
				result = TokenKind.OperatorRightShift;
				break;
			case "^":
				result = TokenKind.OperatorBinaryXor;
				break;
			case "&":
				result = TokenKind.OperatorBinaryAnd;
				break;
			case "|":
				result = TokenKind.OperatorBinaryOr;
				break;
			case "||":
				result = TokenKind.OperatorLogicalOr;
				break;
			case "&&":
				result = TokenKind.OperatorLogicalAnd;
				break;
			case "+=":
				result = TokenKind.OperatorAddAssign;
				break;
			case "-=":
				result = TokenKind.OperatorSubtractAssign;
				break;
			case "*=":
				result = TokenKind.OperatorMultiplyAssign;
				break;
			case "/=":
				result = TokenKind.OperatorDivideAssign;
				break;
			case "**":
				result = TokenKind.OperatorExponentAssign;
				break;
			case "<<=":
				result = TokenKind.OperatorLeftShiftAssign;
				break;
			case ">>=":
				result = TokenKind.OperatorRightShiftAssign;
				break;
			case "^=":
				result = TokenKind.OperatorBinaryXorAssign;
				break;
			case "&=":
				result = TokenKind.OperatorBinaryAndAssign;
				break;
			case "|=":
				result = TokenKind.OperatorBinaryOrAssign;
				break;
			case "%":
				result = TokenKind.OperatorModulo;
				break;
			case "=":
				result = TokenKind.OperatorAssign;
				break;
			case "==":
				result = TokenKind.OperatorEquals;
				break;
			case "<=":
				result = TokenKind.OperatorLessThanOrEqual;
				break;
			case ">=":
				result = TokenKind.OperatorGreaterThanOrEqual;
				break;
			case "!=":
				result = TokenKind.OperatorNotEqual;
				break;
			case "!":
				result = TokenKind.OperatorNot;
				break;
			case "<":
				result = TokenKind.OperatorLessThan;
				break;
			case ">":
				result = TokenKind.OperatorGreaterThan;
				break;
			case "<==>":
				result = TokenKind.OperatorComparison;
				break;
			case "~":
				result = TokenKind.OperatorNegation;
				break;
			case ":=":
				result = TokenKind.OperatorDeclareAssign;
				break;
			case ":==":
				result = TokenKind.OperatorDeclareCompare;
				break;
			case "::=":
				result = TokenKind.OperatorDeclareCreateGetter;
				break;
			default:
				throw new Error("Invalid operator: '" + op + "'");
		}
		return result;
	}
	
}

export = Operator;