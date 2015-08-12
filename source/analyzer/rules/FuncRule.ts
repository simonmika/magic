/// <reference path="Rule" />
/// <reference path="../../frontend/Token" />
/// <reference path="../../frontend/TokenKind" />
/// <reference path="../Report" />
/// <reference path="../Violation" />
/// <reference path="../RuleKind" />

class FuncRule implements Rule {
	constructor() { }
	run(tokens: Token[], report: Report) {
		for (var i = 0; i < tokens.length; i++) {
			switch (tokens[i].kind) {
				case TokenKind.KeywordFunc:
					i++;
					if (tokens[i].kind == TokenKind.WhitespaceLineFeed) {
						break;
					}
					var canExit = false;
					var insideBlock = false;
					while (!canExit && tokens[i].kind != TokenKind.Eof) {
						switch (tokens[i].kind) {
							case TokenKind.SeparatorLeftParanthesis:
								if (!insideBlock && tokens[i - 1].kind == TokenKind.Identifier) {
									report.addViolation(new Violation(tokens[i].location,
										"missing space between func identifier and parenthesis",
										RuleKind.General));
								}
								i = this.checkBody(tokens, i + 1, report,
									TokenKind.SeparatorLeftParanthesis, TokenKind.SeparatorRightParanthesis,
									"unnecessary parentheses [empty argument list]");
								if (tokens[i].kind == TokenKind.WhitespaceLineFeed) {
									canExit = true;
								}
								break;
							case TokenKind.SeparatorLeftCurly:
								insideBlock = true;
								i = this.checkBody(tokens, i + 1, report,
									TokenKind.SeparatorLeftCurly, TokenKind.SeparatorRightCurly,
									"unnecessary curly brackets [empty function body]");
								canExit = true;
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
