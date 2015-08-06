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
		var previous = Token.empty;
		for (var i = 0; i < tokens.length; i++) {
			if (tokens[i].kind == TokenKind.WhitespaceLineFeed) {
				var enough = false;
				linefeedLocation = tokens[i + 1].location;
				while (!enough) {
					i++;
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
				}
			}
			if (linefeeds > 0 && tokens[i].kind == TokenKind.Eof) {
				report.addViolation(new Violation(linefeedLocation,
					"unnecessary empty line(s) before end of file", RuleKind.Whitespace));
			} else if (linefeeds > 0 && tokens[i].kind == TokenKind.SeparatorRightCurly) {
				report.addViolation(new Violation(linefeedLocation,
					"unnecessary empty line(s) before closing curly", RuleKind.Whitespace));
			}else if (linefeeds > 1) {
				report.addViolation(new Violation(linefeedLocation,
					"too many empty lines: " + linefeeds, RuleKind.Whitespace));
			}
			linefeeds = 0;
			previous = tokens[i];
		}
	}
}

export = EmptyLinesRule;