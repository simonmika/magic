///<reference path="./../typings/node/node.d.ts" />

import Reader = require("./frontend/CharacterReader");
import Lexer = require("./frontend/Lexer");
import Glossary = require("./frontend/Glossary");
import Dictionary = require("./utilities/Dictionary");

class Magic {

	private glossary = new Glossary();

	constructor(cmd: string[]) {
		this.parseCommandLine(cmd);
	}

	parseCommandLine(cmd: string[]) {
		console.log(cmd[0]);
	}
}

var magic = new Magic(process.argv);