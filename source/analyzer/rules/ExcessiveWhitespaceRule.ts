import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import Report = require("./../Report");
import Violation = require("./../Violation");
import RuleKind = require("./../RuleKind");

class ExcessiveWhitespaceRule implements Rule {
	constructor() { }
	run(tokens: Array<Token>, report: Report) {
		var newlines = 0;
		var spaces = 0;
		for(var i = 0; i < tokens.length; i++) {
			switch(tokens[i].kind) {
				case TokenKind.WhitespaceLineFeed:
					i++;
					while(TokenKind[tokens[i].kind].indexOf("Whitespace") > -1) {
						if(tokens[i].kind == TokenKind.WhitespaceLineFeed) {
							newlines++;
						}
						i++;
					}
					break;
				case TokenKind.WhitespaceSpace:
					i++;
					while(tokens[i].kind == TokenKind.WhitespaceSpace) {
						while(tokens[i].kind == TokenKind.WhitespaceSpace) {
							spaces++;
							i++;
						}
					}
					break;
				default:
					newlines = 0;
					spaces = 0;
					break;
			}
			if(newlines > 1) {
				console.log("too many empty lines: " + newlines);
			}
			if(spaces > 1) {
				console.log("too many consecutive space characters: " + spaces);
			}
			newlines = 0;
			spaces = 0;
		}
	}
}
/*
		var offset = 0;
		var linefeeds = 0;
		var spaces = 0;
		for (var i = 0; i < tokens.length; i++) {
			if (tokens[i].kind == TokenKind.WhitespaceSpace && tokens[i + 1].kind == TokenKind.WhitespaceLineFeed) {
				report.addViolation(new Violation(tokens[i].location,
					"space character before a new line", RuleKind.Whitespace));
			}
			while (tokens[i].kind != TokenKind.Eof && TokenKind[tokens[i].kind].indexOf("Whitespace") > -1) {
				if (tokens[i].kind == TokenKind.WhitespaceLineFeed) {
					linefeeds++;
				} else if (tokens[i].kind == TokenKind.WhitespaceSpace) {
					spaces++;
				}
				i++;
			}
			if ((--linefeeds) >= 2) {
				report.addViolation(new Violation(tokens[i - 1].location,
					"too many empty lines: " + linefeeds, RuleKind.Whitespace));
			}
			if (spaces >= 2) {
				var message = "too many consecutive space characters: " + spaces;
				if(spaces > 3) {
					message += " (did you mean to tab here?)"
				}
				report.addViolation(new Violation(tokens[i].location, message, RuleKind.Whitespace));
			}
			linefeeds = 0;
			spaces = 0;
		}
*/

export = ExcessiveWhitespaceRule;