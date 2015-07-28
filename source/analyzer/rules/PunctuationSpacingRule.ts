import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import Report = require("./../Report");
import Violation = require("./../Violation");

class PunctuationSpacingRule implements Rule {
	constructor() { }
	run(tokens: Array<Token>, report: Report) {
		var previous = Token.empty;
		tokens.forEach(t => {
			switch(previous.kind) {
				case TokenKind.SeparatorComma:
					if(t.kind != TokenKind.WhitespaceSpace && t.kind != TokenKind.WhitespaceLineFeed) {
						report.addViolation(new Violation(t.location, "missing space after punctuation '" + previous.value + "'", "PunctuationSpacing"));
					}
					break;
			}
			previous = t;
		});
	}
}

export = PunctuationSpacingRule;