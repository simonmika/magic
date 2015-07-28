import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import Report = require("./../Report");
import Violation = require("./../Violation");

class OperatorSpacingRule implements Rule {
	constructor() { }
	run(tokens: Token[], report: Report) {
		var index = 0;
		var t: Token;
		var previous = Token.empty;
		for(var i = 0; i < tokens.length; i++) {
			t = tokens[i];
			if (TokenKind[t.kind].indexOf("Operator") > -1) {
				switch (t.kind) {
					case TokenKind.KeywordOperator:
					case TokenKind.OperatorDereference:
					case TokenKind.OperatorLessThan:
					case TokenKind.OperatorGreaterThan:
					case TokenKind.OperatorAssign:
					case TokenKind.OperatorNot:
					case TokenKind.OperatorRange:
					case TokenKind.OperatorConditional:
					case TokenKind.OperatorExponent:
					case TokenKind.OperatorNegate:
					case TokenKind.OperatorMinus:
					case TokenKind.OperatorMultiply:
					case TokenKind.OperatorBitwiseAnd:
					case TokenKind.OperatorBitwiseOr:
						break;
					default:
						var left = previous;
						var right = tokens[i + 1];
						if(left.kind != TokenKind.WhitespaceSpace) {
							report.addViolation(new Violation(t.location, "missing space before operator '" + t.value + "'", "OperatorSpacing"));
						}
						if(right.kind != TokenKind.WhitespaceSpace && right.kind != TokenKind.WhitespaceLineFeed) {
							report.addViolation(new Violation(right.location, "missing space after operator '" + t.value + "'", "OperatorSpacing"));
						}
						break;
				}
			}
			previous = t;
		}
	}
}

export = OperatorSpacingRule;