/// <reference path="../../typings/node/node" />
/// <reference path="../Error/Position" />
/// <reference path="../Error/Location" />
/// <reference path="../Error/Region" />
/// <reference path="../Error/Level" />
/// <reference path="../Error/Type" />
/// <reference path="Reader" />

var fs = require("fs");

module Magic.IO {
	export class StringReader implements Reader {
		private count: number
		private line: number
		private column: number
		private lastMark: Error.Position
		constructor(private content: string, private path: string = "") {
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
		getLocation(): Error.Location { return new Error.Location(this.path, this.line, this.column) }
		mark(): Error.Region {
			var result = new Error.Region(this.path, this.lastMark, new Error.Position(this.line, this.column))
			this.lastMark = new Error.Position(this.line, this.column)
			return result
		}
	}
}
