/// <reference path="../Error/Location" />
/// <reference path="../Error/Region" />
/// <reference path="Reader" />

module Magic.IO {
	export class BufferedReader implements Reader {
		buffer: string = ""
		private line: number
		private column: number
		private lastMark: Error.Position
		constructor(private backend: Reader) {
		}
		isEmpty(): boolean {
			return this.buffer.length == 0 && this.backend.isEmpty()
		}
		peek(length: number = 1): string {
			var next: string = null
			while (length > this.buffer.length && (next = this.backend.read())) {
				this.buffer += next
			}
			return length > this.buffer.length ? null : this.buffer.slice(0, length - 1)
		}
		read(length: number = 1): string {
			var result = this.peek(length)
			if (this.buffer.length > 1) {
				this.buffer = this.buffer.slice(1)
			}
			for (var i = 0; i < result.length; i++) {
				switch (result.charAt(i)) {
					case "\0":
						this.column = 0
						this.line = 0
						break
					case "\n":
						this.column = 0
						this.line++
						break
					default:
						this.column++
						break
				}
			}
			return result
		}
		getResource(): string { return this.backend.getResource() }
		getLocation(): Error.Location { return new Error.Location(this.getResource(), this.line, this.column) }
		mark(): Error.Region {
			var result = new Error.Region(this.getResource(), this.lastMark, new Error.Position(this.line, this.column))
			this.lastMark = new Error.Position(this.line, this.column)
			return result
		}
	}
}
