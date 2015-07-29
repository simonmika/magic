import Rule = require("./rules/Rule");
import Token = require("./../frontend/Token");
import Report = require("./Report");

//
// TODO: The analyzer should not work with a list of tokens, it should work with a parse tree.
//
class Analyzer {

	constructor(private tokens: Array<Token>) { }

	run(rules: Array<Rule>) {
		var report = new Report();
		rules.forEach(rule => {
			rule.run(this.tokens, report);
		});
		return report;
	}
}

export = Analyzer;