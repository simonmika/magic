///<reference path="./../typings/node/node.d.ts" />
import fs = require("fs");

import Dictionary = require("./utilities/Dictionary");
import StringUtils = require("./utilities/StringUtils");
import Lexer = require("./frontend/Lexer");
import Glossary = require("./frontend/Glossary");
import Analyser = require("./analyzer/Analyzer");
import Violation = require("./analyzer/Violation");
import Report = require("./analyzer/Report");
import Rule = require("./analyzer/rules/Rule");
import ExcessiveWhitespaceRule = require("./analyzer/rules/ExcessiveWhitespaceRule");
import LineLengthRule = require("./analyzer/rules/LineLengthRule");
import KeywordSpacingRule = require("./analyzer/rules/KeywordSpacingRule");
import OperatorSpacingRule = require("./analyzer/rules/OperatorSpacingRule");
import PunctuationSpacingRule = require("./analyzer/rules/PunctuationSpacingRule");


class Magic {

	private glossary = new Glossary();

	private targetDirectory: string;
	private targetFiles: string[] = [];

	constructor(cmd: string[]) {
		this.parseCommandLine(cmd.slice(2));
	}

	getFiles(folder: string, recursive: boolean = true) {
		var allFiles: string[] = fs.readdirSync(folder);
		var sourceFiles: string[] = [];
		allFiles.forEach(file => {
			if (fs.lstatSync(folder + "/" + file).isDirectory()) {
				if (recursive) {
					// Do not include SDK folder
					if(file !== "sdk") {
						sourceFiles = sourceFiles.concat(this.getFiles(folder + "/" + file));
					}
				}
			} else {
				if (file.lastIndexOf(".ooc") > -1) {
					sourceFiles.push(fs.realpathSync(folder + "/" + file));
				}
			}
		});
		return sourceFiles;
	}

	parseCommandLine(cmd: string[]) {
		var folder = cmd[0];

		if (folder.charAt(folder.length - 1) === "/") {
			folder = folder.slice(0, folder.length - 1);
		}

		var rules = [];
		rules.push(new ExcessiveWhitespaceRule());
		rules.push(new LineLengthRule(160));
		rules.push(new KeywordSpacingRule());
		rules.push(new OperatorSpacingRule());
		rules.push(new PunctuationSpacingRule());

		this.getFiles(folder).forEach(file => {
			this.analyze(folder, file, rules);
		});
	}

	analyze(baseDir: string, file: string, rules: Rule[]) {
		var lexer = new Lexer(file, this.glossary);
		var analyzer = new Analyser(lexer.getTokenList());
		var report = analyzer.run(rules);
		var reports: Report[] = [];
		if(report.violations.length > 0) {
			reports.push(report);
		}
		var path: string;
		reports.forEach(r => {
			console.log("\n" + r.violations[0].location.filename);
			r.violations.forEach(violation => {
				console.log("    " + StringUtils.padRight(violation.location.toString(), ".", 14) + violation.message);
			});
		});

	}
}

var magic = new Magic(process.argv);