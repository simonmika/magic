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
		private lastPosition: Error.Position
		private lastContent: string
		constructor(private content: string, private path: string = "") {
		}
		isEmpty(): boolean {
			return this.count >= this.content.length
		}
		read(): string {
			var result: string = this.count < this.content.length ? this.content.charAt(this.count++) : null
			this.lastContent += result
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
		getRegion(): Error.Region { return new Error.Region(this.path, this.lastPosition, new Error.Position(this.line, this.column), this.lastContent) }
		mark(): Error.Region {
			var result = this.getRegion()
			this.lastPosition = new Error.Position(this.line, this.column)
			this.lastContent = ""
			return result
		}
	}
}
