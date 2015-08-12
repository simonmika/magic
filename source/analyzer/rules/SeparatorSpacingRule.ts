/// <reference path="Rule" />
/// <reference path="../../frontend/Token" />
/// <reference path="../../frontend/TokenKind" />
/// <reference path="../Report" />
/// <reference path="../Violation" />
/// <reference path="../RuleKind" />

class SeparatorSpacingRule implements Rule {
	constructor() { }
	run(tokens: Token[], report: Report) {
		var previous = Token.empty;
		tokens.forEach(t => {
			switch (previous.kind) {
				case TokenKind.SeparatorColon:
				case TokenKind.SeparatorComma:
					if (t.kind != TokenKind.WhitespaceSpace && t.kind != TokenKind.WhitespaceLineFeed) {
						report.addViolation(new Violation(t.location,
							"missing space after separator '" + previous.value + "'", RuleKind.Separator));
					}
					break;
			}
			previous = t;
		});
	}
}
