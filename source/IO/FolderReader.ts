/// <reference path="../../typings/node/node" />
/// <reference path="../Utilities/Iterator" />
/// <reference path="Reader" />
/// <reference path="FileReader" />

var fs = require("fs");

module Magic.IO {
	export class FolderReader implements Reader {
		private files: string[]
		private current: Reader
		constructor(private path: string, pattern: string) {
			this.files = FolderReader.getFiles(this.path, pattern)
		}
		isEmpty(): boolean {
			return this.files.length == 0 && (!this.current || this.current.isEmpty())
		}
		read(): string {
			var result: string = null
			if (this.current) {
				result = this.current.read()
				if (!result) {
					this.current = null
					result = this.read()
				}
			} else if (this.files.length > 0)
				this.current = new FileReader(this.files.shift())
			console.log("\"" + result + "\"")
			return result
		}
		getResource(): string { return this.current ? this.current.getResource() : null }
		getLocation(): Error.Location { return this.current.getLocation() }
		getRegion(): Error.Region { return this.current.getRegion() }
		mark(): Error.Region { return this.current.mark() }

		private static getFiles(folder: string, filetype: string, ignoreFiles: string[] = []): string[] {
			var result: string[] = []
			var files: string[] = fs.readdirSync(folder)
			var filename = ""
			for (var i = 0; i < files.length; i++) {
				filename = folder + "/" + files[i]
				if (ignoreFiles.indexOf(filename) == -1) {
					if (fs.lstatSync(filename).isDirectory())
						result = result.concat(FolderReader.getFiles(filename, filetype, ignoreFiles))
					else if (files[i].length > filetype.length && files[i].lastIndexOf(filetype, files[i].length - filetype.length) === files[i].length - filetype.length)
						result.push(filename)
				}
			}
			return result
		}
	}
}
