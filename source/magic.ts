/// <reference path="../typings/node/node" />
/// <reference path="Error/ConsoleHandler" />
/// <reference path="Tokens/Lexer" />
/// <reference path="IO/Reader" />
/// <reference path="SelfTest" />

var fs = require("fs")

module Magic {
	export class Program {
		private defaultCommand = "self-test"
		constructor(private commands: string[]) {
			this.commands = this.commands.slice(2)
			if (this.commands.length == 0)
				this.commands.push(this.defaultCommand)
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
					console.log("compile")
				case "verify":
					console.log("verify")
					var lexer = this.openLexer(commands.pop())
					break
				case "self-test":
					var result = SelfTest.run()
					if (!result) {
						console.log("\x1b[41m\x1b[37mmagic self-test failed\x1b[0m")
						process.exit(1)
					}
					break
				case "version":
					console.log("magic " + this.getVersion())
					break
				case "help":
					console.log("help")
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
	magic.run()
	console.log("magic " + magic.getVersion())
} catch (Error) {
	console.log(Error.toString())
}
