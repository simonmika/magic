import fs = require("fs");
import TokenLocation = require("./TokenLocation");

class CharacterReader {
	public static NullCharacter: string = "\0";
	private currentPosition: number = 0;
	private sourceText: string;

	constructor(private sourceFile: string) {
		this.sourceText = this.readFile(sourceFile);
	}
	get location() {
		return new TokenLocation(this.sourceFile, 0, 0);
	}
	get hasNext() {
		return this.currentPosition < this.sourceText.length;
	}
	peek() {
		return this.hasNext ? this.sourceText[this.currentPosition] : CharacterReader.NullCharacter;
	}
	rewind(characters: number = 1) {
		this.currentPosition -= characters;
	}
	advance() {
		this.currentPosition++;
	}
	getNext() {
		var next: string;
		if (!this.hasNext)
			next = CharacterReader.NullCharacter;
		else {
			next = this.sourceText.charAt(this.currentPosition);
			this.currentPosition++;
		}
		return next;
	}
	private readFile(sourceFile: string) {
		try {
			return fs.readFileSync(sourceFile, "utf-8");
		} catch (Error) {
			Error.filename = "CharacterReader";
			throw Error;
		}
	}
}

export = CharacterReader;