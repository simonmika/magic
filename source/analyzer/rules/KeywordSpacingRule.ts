import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import Report = require("./../Report");
import Violation = require("./../Violation");
import RuleKind = require("./../RuleKind");

class KeywordSpacingRule implements Rule {
	constructor() { }
	run(tokens: Array<Token>, report: Report) {
		for (var i = 0; i < tokens.length; i++) {
			var t = tokens[i];
			if (TokenKind[t.kind].indexOf("Keyword") > -1) {
				switch (t.kind) {
					// Disable the rule for the following keywords
					case TokenKind.KeywordUse:
					case TokenKind.KeywordImport:
					case TokenKind.KeywordInclude:
					case TokenKind.KeywordNew:
						break;
					default:
						var left = tokens[i - 1];
						var right = tokens[i + 1];
						// Hackishly allow certain constructs
						switch (right.kind) {
							case TokenKind.OperatorDereference:
							case TokenKind.SeparatorComma:
								continue;
								break;
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
								break;
							default:
								report.addViolation(new Violation(right.location, "missing space after keyword '" + t.value + "'", RuleKind.Keyword));
								break;
						}
						break;
				}
			}
		}
	}
}

export = KeywordSpacingRule;