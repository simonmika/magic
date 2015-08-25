/// <reference path="../typings/node/node" />
/// <reference path="Tokens/Lexer" />
/// <reference path="IO/Reader" />

var fs = require("fs");

module Magic {
	export class Program {
		private path: string
		constructor(command: string[]) {
			this.path = command.length > 1 ? command[1] : ".";
		}
		run() {
			var lexer = new Tokens.Lexer(new IO.FolderReader(this.path, "*.ooc"))

		}
		getVersion(): string {
			return "0.2"
		}
	}
}

try {
	var magic = new Magic.Program(process.argv);
	console.log("magic " + magic.getVersion());
} catch (Error) {
	console.log(Error.toString());
}
