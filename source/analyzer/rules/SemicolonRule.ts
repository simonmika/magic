import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import Report = require("./../Report");
import Violation = require("./../Violation");
import RuleKind = require("./../RuleKind");

class SemicolonRule implements Rule {
	constructor() { }
	run(tokens: Array<Token>, report: Report) {
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

export = SemicolonRule;