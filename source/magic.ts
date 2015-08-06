///<reference path="./../typings/node/node.d.ts" />
import fs = require("fs");

import Filesystem = require("./utilities/Filesystem");
import StringUtils = require("./utilities/StringUtils");
import Glossary = require("./frontend/Glossary");
import Analyser = require("./analyzer/Analyzer");
import Rule = require("./analyzer/rules/Rule");
import EmptyLinesRule = require("./analyzer/rules/EmptyLinesRule");
import ExcessiveSpaceRule = require("./analyzer/rules/ExcessiveSpaceRule");
import LineLengthRule = require("./analyzer/rules/LineLengthRule");
import KeywordSpacingRule = require("./analyzer/rules/KeywordSpacingRule");
import OperatorSpacingRule = require("./analyzer/rules/OperatorSpacingRule");
import SeparatorSpacingRule = require("./analyzer/rules/SeparatorSpacingRule");
import RedundantTypeInfoRule = require("./analyzer/rules/RedundantTypeInfoRule");
import FuncRule = require("./analyzer/rules/FuncRule");
import ThisUsageRule = require("./analyzer/rules/ThisUsageRule");
import SemicolonRule = require("./analyzer/rules/SemicolonRule");

class Magic {
	private static version = "0.1.5-alpha";

	private arguments: string[];

	constructor(cmd: string[]) {
		cmd = cmd.slice(2);
		if (cmd.length == 0) {
			cmd[0] = ".";
		}
		this.arguments = cmd;
	}

	analyze() {
		var rules = [
			new EmptyLinesRule(),
			new ExcessiveSpaceRule(),
			new KeywordSpacingRule(),
			new OperatorSpacingRule(),
			new SeparatorSpacingRule(),
			new RedundantTypeInfoRule(),
			new FuncRule(),
			new ThisUsageRule(),
			new SemicolonRule()
		];
		var analyzer = new Analyser(new Glossary(), rules);
		analyzer.analyze(this.arguments).forEach(report => {
			if (report.violations.length > 0) {
				var file = report.violations[0].location.filename;
				console.log("\n" + file);
				console.log(StringUtils.padRight("", "-", file.length));
				report.violations.forEach(v => {
					console.log(StringUtils.padRight(v.location.toString(), ".", 14) + v.message);
				});
			}
		});
	}

	static printVersion() {
		console.log("\n-> magic " + Magic.version);
	}
}

try {
	var magic = new Magic(process.argv);
	magic.analyze()
	Magic.printVersion();
} catch (Error) {
	console.log(Error.toString());
}