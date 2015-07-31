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
import EmptyLinesRule = require("./analyzer/rules/EmptyLinesRule");
import ExcessiveSpaceRule = require("./analyzer/rules/ExcessiveSpaceRule");
import LineLengthRule = require("./analyzer/rules/LineLengthRule");
import KeywordSpacingRule = require("./analyzer/rules/KeywordSpacingRule");
import OperatorSpacingRule = require("./analyzer/rules/OperatorSpacingRule");
import SeparatorSpacingRule = require("./analyzer/rules/SeparatorSpacingRule");
import RedundantTypeInfoRule = require("./analyzer/rules/RedundantTypeInfoRule");
import FuncRule = require("./analyzer/rules/FuncRule");
import ThisUsageRule = require("./analyzer/rules/ThisUsageRule");

class Magic {
	private static version = "0.1.2-alpha";

	private glossary = new Glossary();

	private targetBaseDirectory: string;
	private analyzerRules = [];
	private ignoreFiles: string[] = [];

	constructor(cmd: string[]) {
		cmd = cmd.slice(2);
		this.analyzerRules.push(new ThisUsageRule());
		this.analyzerRules.push(new RedundantTypeInfoRule());
		this.analyzerRules.push(new FuncRule());
		this.analyzerRules.push(new KeywordSpacingRule());
		this.analyzerRules.push(new OperatorSpacingRule());
		this.analyzerRules.push(new SeparatorSpacingRule());
		this.analyzerRules.push(new EmptyLinesRule());
		this.analyzerRules.push(new ExcessiveSpaceRule());
		if (cmd[0] == "-f") {
			this.analyze(cmd[1]);
		} else {
			this.analyzeDirectory(cmd[0]);
		}
		console.log("-> magic " + Magic.version);
	}

	analyzeDirectory(directory: string) {
		if (directory == undefined) {
			directory = ".";
		} else if (directory.charAt(directory.length - 1) === "/") {
			directory = directory.slice(0, directory.length - 1);
		}
		this.targetBaseDirectory = directory;
		var ignoreFile = directory + "/.magicignore";
		if (fs.existsSync(ignoreFile)) {
			fs.readFileSync(ignoreFile, "utf-8").split("\n").filter(f => {
				return f.length > 0;
			}).forEach(file => {
				// Trim off leading/trailing '/'
				if (file.charAt(file.length - 1) === "/") {
					file = file.slice(0, file.length - 1);
				}
				if (file.charAt(0) === "/") {
					file = file.slice(1);
				}
				this.ignoreFiles.push(this.targetBaseDirectory + "/" + file);
			});
		}
		this.getFiles(this.targetBaseDirectory).forEach(file => {
			this.analyze(file)
		});
	}

	getFiles(folder: string, recursive: boolean = true) {
		var sourceFiles: string[] = [];
		var allFiles: string[] = fs.readdirSync(folder);
		var filename = "";
		allFiles.forEach(file => {
			filename = folder + "/" + file;
			if (this.ignoreFiles.indexOf(filename) == -1) {
				if (fs.lstatSync(filename).isDirectory()) {
					if (recursive) {
						sourceFiles = sourceFiles.concat(this.getFiles(filename));
					}
				} else {
					if (file.lastIndexOf(".ooc", file.length - 4) === file.length - 4) {
						sourceFiles.push(fs.realpathSync(filename));
					}
				}
			}
		});
		return sourceFiles;
	}

	analyze(file: string) {
		var lexer = new Lexer(file, this.glossary);
		var analyzer = new Analyser(lexer.getTokenList());
		var report = analyzer.run(this.analyzerRules);
		var reports: Report[] = [];
		if (report.violations.length > 0) {
			reports.push(report);
		}
		reports.forEach(r => {
			console.log("\n" + r.violations[0].location.filename);
			console.log(StringUtils.padRight("", "-", r.violations[0].location.filename.length));
			r.violations/*.sort((a, b) => {
				return a.location.line - b.location.line;
			})*/.forEach(violation => {
				console.log("  " + StringUtils.padRight(violation.location.toString(), ".", 14) + violation.message);
			});
			console.log();
		});
	}
}

var magic = new Magic(process.argv);