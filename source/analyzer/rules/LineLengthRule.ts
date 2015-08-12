/// <reference path="Rule" />
/// <reference path="../../frontend/Token" />
/// <reference path="../../frontend/TokenKind" />
/// <reference path="../Report" />
/// <reference path="../Violation" />
/// <reference path="../RuleKind" />

class LineLengthRule implements Rule {
	constructor(private maxLineLength: number) { }
	run(tokens: Token[], report: Report) {
		tokens.forEach(t => {
			if (t.kind == TokenKind.WhitespaceLineFeed) {
				if (t.location.column > this.maxLineLength) {
					var length = t.location.column;
					var message = "line length warning: " + length + " characters!";
					report.addViolation(new Violation(t.location, message, RuleKind.General));
				}
			}
		});
	}
}
