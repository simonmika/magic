/// <reference path="../../typings/node/node" />
/// <reference path="Position" />
/// <reference path="Location" />
/// <reference path="Region" />
/// <reference path="Reader" />

var fs = require("fs");

module Magic.IO {
	export class FileReader implements Reader {
		private content: string
		private count: number
		private line: number
		private column: number
		private lastMark: Position
		constructor(private path: string) {
			this.content = fs.readFileSync(path, "utf-8");
			this.lastMark = new Position(this.line, this.column)
		}
		isEmpty(): boolean {
			return this.count >= this.content.length
		}
		read(): string {
			var result: string = this.count < this.content.length ? this.content.charAt(this.count++) : null
			if (result) {
				if (result == "\n") {
					this.line++
					this.column = 0
				} else {
					this.column++
				}
			}
			return result
		}
		getResource(): string { return this.path }
		getLocation(): Location { return new Location(this.path, this.line, this.column) }
		mark(): Region {
			var result = new Region(this.path, this.lastMark, new Position(this.line, this.column))
			this.lastMark = new Position(this.line, this.column)
			return result
		}
	}
}
