/// <reference path="../typings/node/node" />
/// <reference path="Error/ConsoleHandler" />
/// <reference path="Tokens/Lexer" />
/// <reference path="IO/Reader" />

var fs = require("fs")

module Magic {
	export class Program {
		private defaultCommand = "compile"
		constructor(private commands: string[]) {
		}
		private openReader(path: string) {
			return path.slice(-4) == ".ooc" ? new IO.FileReader(path) : new IO.FolderReader(path, "*.ooc")
		}
		private openLexer(path: string) {
			return new Tokens.Lexer(this.openReader(path), new Error.ConsoleHandler())
		}
		private runHelper(command: string, commands: string[]) {
			switch (command) {
				case "compile":
				case "verify":
					var lexer = this.openLexer(commands.pop())
					break
				case "self-test":
					break
				case "version":
					console.log("magic " + magic.getVersion())
					break
				case "help":
					break
				default:
					commands.push(command)
					command = undefined
					this.runHelper(this.defaultCommand, commands)
					break
			}
			if (command)
				this.defaultCommand = command
		}
		run() {
			var command: string
			while (command = this.commands.shift()) {
				this.runHelper(command, this.commands)
			}
		}
		getVersion(): string {
			return "0.2"
		}
	}
}

try {
	var magic = new Magic.Program(process.argv)
	console.log("magic " + magic.getVersion())
} catch (Error) {
	console.log(Error.toString())
}
