import fs = require("fs");
import TokenLocation = require("./TokenLocation");

class CharacterReader {
	private nullChar = "\0";
	private currentPosition: number = 0;
	private sourceText: string;

	constructor(private sourceFile: string) {
		this.sourceText = this.readFile(sourceFile);
	}

	get nullCharacter() { return this.nullChar; }
	set nullCharacter(nullChar: string) { this.nullChar = nullChar; }
	get location() { return new TokenLocation(this.sourceFile, 0, 0); }
	get hasNext() {	return this.currentPosition < this.sourceText.length; }

	peek() {
		return this.hasNext ? this.sourceText[this.currentPosition] : this.nullCharacter;
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
			next = this.nullCharacter;
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