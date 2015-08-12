///<reference path="./../typings/node/node.d.ts" />
var fs = require("fs");

///<reference path="./utilities/Filesystem" />
///<reference path="./utilities/StringUtils" />
///<reference path="./frontend/Glossary" />
///<reference path="./analyzer/Analyzer" />
///<reference path="./analyzer/rules/Rule" />
///<reference path="./analyzer/rules/EmptyLinesRule" />
///<reference path="./analyzer/rules/ExcessiveSpaceRule" />
///<reference path="./analyzer/rules/LineLengthRule" />
///<reference path="./analyzer/rules/KeywordSpacingRule" />
///<reference path="./analyzer/rules/OperatorSpacingRule" />
///<reference path="./analyzer/rules/SeparatorSpacingRule" />
///<reference path="./analyzer/rules/RedundantTypeInfoRule" />
///<reference path="./analyzer/rules/FuncRule" />
///<reference path="./analyzer/rules/ThisUsageRule" />
///<reference path="./analyzer/rules/SemicolonRule" />

class Magic {
	private static version = "0.1.6-alpha";

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
		var analyzer = new Analyzer(new Glossary(), rules);
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
