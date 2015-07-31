import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import TokenLocation = require("../../frontend/TokenLocation");
import Report = require("./../Report");
import Violation = require("./../Violation");
import RuleKind = require("./../RuleKind");

class EmptyLinesRule implements Rule {
	constructor() { }
	run(tokens: Array<Token>, report: Report) {
		var linefeeds = 0;
		var linefeedLocation: TokenLocation;
		for (var i = 0; i < tokens.length; i++) {
			switch (tokens[i].kind) {
				case TokenKind.WhitespaceLineFeed:
					var enough = false;
					i++;
					linefeedLocation = tokens[i].location;
					while (!enough) {
						switch (tokens[i].kind) {
							case TokenKind.WhitespaceLineFeed:
								linefeeds++;
								break;
							case TokenKind.WhitespaceSpace:
							case TokenKind.WhitespaceTab:
								break;
							default:
								enough = true;
								break;
						}
						i++;
					}
					break;
				default:
					linefeeds = 0;
					break;
			}
			if (linefeeds > 1) {
				report.addViolation(new Violation(linefeedLocation,
					"too many empty lines: " + linefeeds, RuleKind.Whitespace));
			}
			linefeeds = 0;
		}
	}
}

export = EmptyLinesRule;