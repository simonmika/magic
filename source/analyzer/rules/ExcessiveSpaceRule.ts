import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import TokenLocation = require("../../frontend/TokenLocation");
import Report = require("./../Report");
import Violation = require("./../Violation");
import RuleKind = require("./../RuleKind");

class ExcessiveSpaceRule implements Rule {
	constructor() { }
	run(tokens: Array<Token>, report: Report) {
		var spaces = 0;
		var spaceLocation: TokenLocation;
		for (var i = 0; i < tokens.length; i++) {
			switch (tokens[i].kind) {
				case TokenKind.WhitespaceSpace:
					spaceLocation = tokens[i].location;
					i++;
					if (tokens[i].kind == TokenKind.WhitespaceLineFeed) {
						report.addViolation(new Violation(tokens[i - 1].location,
							"space before a line break", RuleKind.Whitespace));
					}
					while (tokens[i].kind == TokenKind.WhitespaceSpace) {
						spaces++;
						while (tokens[i].kind == TokenKind.WhitespaceSpace) {
							spaces++;
							i++;
						}
					}
					break;
				default:
					spaces = 0;
					break;
			}
			if (spaces > 1) {
				var message = "too many consecutive space characters: " + spaces;
				if (spaces > 2) {
					message += " [did you mean to tab here?]";
				}
				report.addViolation(new Violation(spaceLocation, message, RuleKind.Whitespace));
			}
			spaces = 0;
		}
	}
}

export = ExcessiveSpaceRule;