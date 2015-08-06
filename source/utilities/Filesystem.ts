///<reference path="./../../typings/node/node.d.ts" />
import fs = require("fs");

class Filesystem {
	constructor() { }

	static getFiles(folder: string, filetype: string, ignoreFiles: string[] = []) {
		var sourceFiles: string[] = [];
		var allFiles = fs.readdirSync(folder);
		var filename = "";
		allFiles.forEach(file => {
			filename = folder + "/" + file;
			if (ignoreFiles.indexOf(filename) == -1) {
				if (fs.lstatSync(filename).isDirectory()) {
					sourceFiles = sourceFiles.concat(Filesystem.getFiles(filename, filetype, ignoreFiles));
				} else {
					if (file.length > filetype.length &&
						file.lastIndexOf(filetype, file.length - filetype.length) === file.length - filetype.length) {
						//
						sourceFiles.push(filename);
					}
				}
			}
		});
		return sourceFiles;
	}

}

export = Filesystem;
