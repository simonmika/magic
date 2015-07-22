///<reference path="./../typings/node/node.d.ts" />

import Lexer = require("./frontend/Lexer");
import Glossary = require("./frontend/Glossary");
import Dictionary = require("./utilities/Dictionary");

class Magic {

	private glossary = new Glossary();
	
	private targetDirectory: string;

	constructor(cmd: string[]) {
		this.parseCommandLine(cmd);
	}

	parseCommandLine(cmd: string[]) {
		cmd.forEach(element => {
			console.log(element);
		});
	}
}

var magic = new Magic(process.argv);