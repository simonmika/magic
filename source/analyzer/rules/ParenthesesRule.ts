import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import Report = require("./../Report");
import Violation = require("./../Violation");
import RuleKind = require("./../RuleKind");

class ParenthesesRule implements Rule {
	constructor() { }
	run(tokens: Array<Token>, report: Report) {
		var keepReading: boolean;
		var curly = false;
		for (var i = 0; i < tokens.length; i++) {
			if (tokens[i].kind == TokenKind.KeywordFunc) {
				keepReading = true;
				curly = false;
				while (keepReading && !curly) {
					switch (tokens[i].kind) {
						case TokenKind.Eof:
						case TokenKind.WhitespaceLineFeed:
							keepReading = false;
							break;
						case TokenKind.SeparatorLeftCurly:
							curly = true;
							// FALL-THROUGH
						case TokenKind.SeparatorLeftParanthesis:
							var emptyArgs = true;
							var location = tokens[i].location;
							i++;
							while (emptyArgs && tokens[i].kind != TokenKind.SeparatorRightParanthesis &&
								tokens[i].kind != TokenKind.SeparatorRightCurly)
							{
								switch(tokens[i].kind) {
									case TokenKind.WhitespaceLineFeed:
									case TokenKind.WhitespaceSpace:
									case TokenKind.WhitespaceTab:
										break;
									default:
										emptyArgs = false;
										break;
								}
								i++;
							}
							if (emptyArgs) {
								report.addViolation(new Violation(location,
									"unnecessary parentheses/curlies [empty argument list / function body]", RuleKind.General));
							}
							break;
						default:
							i++;
							break;
					}
				}
			}
		}

	}
}

export = ParenthesesRule;