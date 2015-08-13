///<reference path="./../typings/node/node" />

var fs = require("fs");

module Magic {
	export class Program {
		private arguments: string[];

		constructor(command: string[]) {
			command = command.slice(2);
			if (command.length == 0) {
				command[0] = ".";
			}
			this.arguments = command;
		}
		getVersion(): string {
			return "0.1.7-alpha"
		}
	}
}

try {
	var magic = new Magic.Program(process.argv);
	console.log("magic " + magic.getVersion());
} catch (Error) {
	console.log(Error.toString());
}
