import Rule = require("./Rule");
import Token = require("./../../frontend/Token");
import TokenKind = require("./../../frontend/TokenKind");
import Report = require("./../Report");
import Violation = require("./../Violation");
import RuleKind = require("./../RuleKind");

// (x: Float, y: Float, z: Float)

class RedundantTypeInfoRule implements Rule {
	constructor() { }
	run(tokens: Array<Token>, report: Report) {
		for(var i = 0; i < tokens.length; i++) {
			if(tokens[i].kind == TokenKind.KeywordFunc) {
				//console.log("func");
			}
		}
	}
}

export = RedundantTypeInfoRule;