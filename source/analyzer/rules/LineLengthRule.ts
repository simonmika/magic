import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import Report = require("./../Report");
import Violation = require("./../Violation");
import RuleKind = require("./../RuleKind");

class LineLengthRule implements Rule {
	constructor(private maxLineLength: number) { }
	run(tokens: Array<Token>, report: Report) {
		tokens.forEach(t => {
			if (t.kind == TokenKind.WhitespaceLineFeed) {
				if (t.location.column > this.maxLineLength) {
					var length = t.location.column;
					var message = "Line length warning: " + length + " characters!";
					report.addViolation(new Violation(t.location, message, RuleKind.General));
				}
			}
		});
	}
}

export = LineLengthRule;