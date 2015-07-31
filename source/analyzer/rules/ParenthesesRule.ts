import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import Report = require("./../Report");
import Violation = require("./../Violation");
import RuleKind = require("./../RuleKind");

class ParenthesesRule implements Rule {
	constructor() { }
	run(tokens: Array<Token>, report: Report) {
		for (var i = 0; i < tokens.length; i++) {
			switch (tokens[i].kind) {
				case TokenKind.KeywordFunc:
					i++;
					while (tokens[i].kind != TokenKind.Eof) {
						switch (tokens[i].kind) {
							case TokenKind.SeparatorLeftParanthesis:
								i = this.checkBody(tokens, i + 1, report,
										TokenKind.SeparatorLeftParanthesis, TokenKind.SeparatorRightParanthesis,
										"unnecessary parentheses [empty argument list]");
								break;
							case TokenKind.SeparatorLeftCurly:
								i = this.checkBody(tokens, i + 1, report,
										TokenKind.SeparatorLeftCurly, TokenKind.SeparatorRightCurly,
										"unnecessary curly brackets [empty function body]");
								break;
							default:
								i++;
								break;
						}
					}
					break;
				default:
					break;
			}
		}
	}

	checkBody(tokens: Token[], index: number, report: Report, openingKind: TokenKind, closingKind: TokenKind, message: string) {
		var delta = 1;
		var emptyBody = true;
		var startLocation = tokens[index - 1].location;
		//console.log(tokens[index - 1]);
		while (delta > 0 && tokens[index].kind != TokenKind.Eof) {
			switch (tokens[index].kind) {
				case TokenKind.WhitespaceLineFeed:
				case TokenKind.WhitespaceSpace:
				case TokenKind.WhitespaceTab:
					break;
				case openingKind:
					delta++;
					break;
				case closingKind:
					delta--;
					break;
				default:
					emptyBody = false;
					break;
			}
			index++;
		}
		if (emptyBody) {
			report.addViolation(new Violation(startLocation, message, RuleKind.General));
		}
		return index;
	}
}

export = ParenthesesRule;