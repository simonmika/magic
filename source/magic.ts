/// <reference path="../typings/node/node" />
/// <reference path="Error/ConsoleHandler" />
/// <reference path="Tokens/Lexer" />
/// <reference path="Tokens/GapRemover" />
/// <reference path="Tokens/Consumer" />
/// <reference path="LexicalRules/Verifier" />
/// <reference path="IO/Reader" />
/// <reference path="IO/FileReader" />
/// <reference path="IO/FolderReader" />
/// <reference path="Unit/Fixture" />

var fs = require("fs")

module Magic {
	export class Program {
		private defaultCommand = "compile"
		constructor(private commands: string[]) {
			this.commands = this.commands.slice(2)
			if (this.commands.length == 0) {
				this.commands.push(this.defaultCommand)
				this.commands.push(".")
			}
		}
		private openReader(path: string) {
			return path.slice(-4) == ".ooc" ? new IO.FileReader(path) : new IO.FolderReader(path, "*.ooc")
		}
		private openLexer(path: string, handler: Error.Handler) {
			return new LexicalRules.Verifier(new Tokens.GapRemover(new Tokens.Lexer(this.openReader(path), handler)), handler)
		}
		private runHelper(command: string, commands: string[]) {
			var handler = new Error.ConsoleHandler()
			switch (command) {
				case "compile":
					console.log("compile")
				case "verify":
					console.log("verify")
					new Tokens.Consumer(this.openLexer(commands.pop(), handler)).run()
					break
				case "self-test":
					Unit.Fixture.run()
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
