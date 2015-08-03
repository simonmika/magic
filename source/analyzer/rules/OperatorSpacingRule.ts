import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import Report = require("./../Report");
import Violation = require("./../Violation");
import RuleKind = require("./../RuleKind");

class OperatorSpacingRule implements Rule {
	constructor() { }
	run(tokens: Token[], report: Report) {
		var index = 0;
		var t: Token;
		var previous = Token.empty;
		for (var i = 0; i < tokens.length; i++) {
			t = tokens[i];
			if (TokenKind[t.kind].indexOf("Operator") > -1) {
				switch (t.kind) {
					// Leave the following operators alone, as they could mean
					// different things depending on the context, or are too much of a hassle
					// to work with when reading a token list instead of a parse tree.
					case TokenKind.KeywordOperator:
					case TokenKind.OperatorDereference:
					case TokenKind.OperatorLessThan:
					case TokenKind.OperatorGreaterThan:
					case TokenKind.OperatorAssign:
					case TokenKind.OperatorNot:
					case TokenKind.OperatorConditional:
					case TokenKind.OperatorExponent:
					case TokenKind.OperatorNegate:
					case TokenKind.OperatorMinus:
					case TokenKind.OperatorMultiply:
					case TokenKind.OperatorBitwiseAnd:
					case TokenKind.OperatorBitwiseOr:
					case TokenKind.OperatorLogicalOr:
					case TokenKind.OperatorRightShift:
						break;
					default:
						var left = previous;
						var right = tokens[i + 1];
						var message = "missing space ";

						var missingLeft = left != null && left.kind != TokenKind.WhitespaceSpace && right.kind != TokenKind.WhitespaceLineFeed;
						var missingRight = right.kind != TokenKind.WhitespaceSpace && right.kind != TokenKind.WhitespaceLineFeed;

						if (missingLeft && missingRight) {
							message += "before and after";
						} else if (missingLeft) {
							message += "before"
						} else {
							message += "after";
						}
						
						if (missingLeft || missingRight) {
							report.addViolation(new Violation(t.location, message + " operator '" + t.value + "'", RuleKind.Operator));
						}
						break;
				}
			}
			previous = t;
		}
	}
}

export = OperatorSpacingRule;