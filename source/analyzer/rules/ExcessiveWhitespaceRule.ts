import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import Report = require("./../Report");
import Violation = require("./../Violation");

class ExcessiveWhitespaceRule implements Rule {
	constructor() { }
	run(tokens: Array<Token>, report: Report) {
		/*var previous = Token.empty;
		var offset = 0;
		var linefeeds = 0;
		var spaces = 0;
		for (var i = 0; i < tokens.length; i++) {
			//if (previous.kind == TokenKind.WhitespaceLineFeed) {
				while (TokenKind[tokens[i].kind].indexOf("Whitespace") > -1) {
					if (tokens[i].kind == TokenKind.WhitespaceLineFeed) {
						linefeeds++;
					}
					i++;
					if (tokens.length <= i) {
						break;
					}
				}
			//}
			if (linefeeds >= 2) {
				report.addViolation(new Violation(tokens[i-1].location, "too many empty lines: " + linefeeds, "ExcessiveWhitespace"));
			}
			linefeeds = 0;
			previous = tokens[i];
		}*/
	}
}

export = ExcessiveWhitespaceRule;