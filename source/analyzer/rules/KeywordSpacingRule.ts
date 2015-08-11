import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import Report = require("./../Report");
import Violation = require("./../Violation");
import RuleKind = require("./../RuleKind");

class KeywordSpacingRule implements Rule {
	constructor() { }
	run(tokens: Array<Token>, report: Report) {
		var previous = Token.empty;
		for (var i = 0; i < tokens.length; i++) {
			if (TokenKind[tokens[i].kind].indexOf("Keyword") < 0) {
				continue;
			}
			switch (tokens[i].kind) {
				case TokenKind.KeywordUse:
				case TokenKind.KeywordImport:
				case TokenKind.KeywordNew:
					break;
				case TokenKind.KeywordGet:
				case TokenKind.KeywordSet:
					break;
				default:
					// left | tokens[i] | right
					var left = previous;
					var right = tokens[i + 1] == undefined ? Token.empty : tokens[i + 1];
					if (right.kind == TokenKind.OperatorDereference || right.kind == TokenKind.SeparatorComma) {
						continue;
					}
					if (left.kind == TokenKind.OperatorLessThan && right.kind == TokenKind.OperatorGreaterThan) {
						continue;
					}
					if (left.kind == TokenKind.SeparatorLeftParanthesis || right.kind == TokenKind.SeparatorRightParanthesis) {
						continue;
					}
					if (right.kind == TokenKind.SeparatorLeftBracket || right.kind == TokenKind.SeparatorRightBracket) {
						continue;
					}
					switch (right.kind) {
						case TokenKind.WhitespaceSpace:
						case TokenKind.WhitespaceTab:
						case TokenKind.WhitespaceLineFeed:
						case TokenKind.OperatorLessThan: // Allow This<T> etc.
						case TokenKind.OperatorConditional: // Allow in? etc.
							break;
						default:
							report.addViolation(new Violation(right.location,
								"missing space after keyword '" + tokens[i].value + "'", RuleKind.Keyword));
							break;
					}
					break;

			}
			previous = tokens[i];
		}
	}
}

export = KeywordSpacingRule;