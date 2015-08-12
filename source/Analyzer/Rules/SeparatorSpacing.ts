module Magic.Analyzer.Rules {
	export class SeparatorSpacing implements Rule {
		constructor() { }
		run(tokens: Frontend.Token[], report: Report) {
			var previous = Frontend.Token.empty;
			tokens.forEach(t => {
				switch (previous.kind) {
					case Frontend.TokenKind.SeparatorColon:
					case Frontend.TokenKind.SeparatorComma:
						if (t.kind != Frontend.TokenKind.WhitespaceSpace && t.kind != Frontend.TokenKind.WhitespaceLineFeed) {
							report.addViolation(new Violation(t.location,
								"missing space after separator '" + previous.value + "'", RuleKind.Separator));
						}
						break;
				}
				previous = t;
			});
		}
	}
}
