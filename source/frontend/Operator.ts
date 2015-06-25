import TokenKind = require("./TokenKind");

class Operator
{
	private static operators: { [key: string]: TokenKind; } = {
		"+": TokenKind.OperatorAdd,
		"+=": TokenKind.OperatorAddAssign,
		"=": TokenKind.OperatorAssign,
		"&": TokenKind.OperatorBitwiseAnd,
		"&=": TokenKind.OperatorBitwiseAndAssign,
		"|": TokenKind.OperatorBitwiseOr,
		"|=": TokenKind.OperatorBitwiseOrAssign,
		"^": TokenKind.OperatorBitwiseXor,
		"^=": TokenKind.OperatorBitwiseXorAssign,
		"<==>": TokenKind.OperatorComparison,
		":=": TokenKind.OperatorDeclareAssign,
		":==": TokenKind.OperatorDeclareCompare,
		"::=": TokenKind.OperatorDeclareCreateProperty,
		"@": TokenKind.OperatorDereference,
		"/": TokenKind.OperatorDivide,
		"/=": TokenKind.OperatorDivideAssign,
		"==": TokenKind.OperatorEquals,
		"**": TokenKind.OperatorExponent,
		"**=": TokenKind.OperatorExponentAssign,
		">": TokenKind.OperatorGreaterThan,
		">=": TokenKind.OperatorGreaterThanOrEqual,
		"<<": TokenKind.OperatorLeftShift,
		"<<=": TokenKind.OperatorLeftShiftAssign,
		"<": TokenKind.OperatorLessThan,
		"<=": TokenKind.OperatorLessThanOrEqual,
		"&&": TokenKind.OperatorLogicalAnd,
		"||": TokenKind.OperatorLogicalOr,
		"%": TokenKind.OperatorModulo,
		"*": TokenKind.OperatorMultiply,
		"*=": TokenKind.OperatorMultiplyAssign,
		"~": TokenKind.OperatorNegate,
		"!": TokenKind.OperatorNot,
		"!=": TokenKind.OperatorNotEqual,
		">>": TokenKind.OperatorRightShift,
		">>=": TokenKind.OperatorRightShiftAssign,
		"-": TokenKind.OperatorSubtract,
		"-=": TokenKind.OperatorSubtractAssign
	};
	
	static isOperator(operator: string) {
		return Operator.toKind(operator) !== TokenKind.Unknown;
	}
	
	static toString(operator: TokenKind) {
		var result: string = null;
		for(var key in Operator.operators) {
			if(Operator.operators[key] == operator) {
				result = key;
			}
		}
		return result;
	}
	
	static toKind(operator: string) {
		var result = Operator.operators[operator];
		return result === undefined ? TokenKind.Unknown : result;
	}
}

export = Operator;