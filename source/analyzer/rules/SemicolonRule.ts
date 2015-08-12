/// <reference path="Rule" />
/// <reference path="../../frontend/Token" />
/// <reference path="../../frontend/TokenKind" />
/// <reference path="../Report" />
/// <reference path="../Violation" />
/// <reference path="../RuleKind" />

class SemicolonRule implements Rule {
	constructor() { }
	run(tokens: Token[], report: Report) {
		var semicolons = 0;
		var previous = Token.empty;
		for (var i = 0; i < tokens.length; i++) {
			if (previous.kind == TokenKind.SeparatorSemicolon && this.isNewlineOrEof(tokens[i])) {
				report.addViolation(new Violation(previous.location,
					"a semicolon may not terminate a line", RuleKind.General));
			}
			previous = tokens[i];
		}
	}

	isNewlineOrEof(token: Token) {
		return token.kind == TokenKind.WhitespaceLineFeed || token.kind == TokenKind.Eof;
	}
}
