///<reference path="../../typings/node/node.d.ts" />
var fs = require("fs");

module Magic.Frontend {
	export class CharacterReader {
		private _sourceText: string;
		private _eofCharacter = "\0";
		private _currentPosition = 0;
		constructor(private sourceFile: string) {
			this._sourceText = this.readFile(sourceFile);
		}
		get eofCharacter() { return this._eofCharacter; }
		set eofCharacter(eofChar: string) { this._eofCharacter = eofChar; }
		get hasNext() { return this._currentPosition < this._sourceText.length; }
		peek() {
			return this.hasNext ? this._sourceText[this._currentPosition] : this.eofCharacter;
		}
		rewind(characters: number = 1) {
			this._currentPosition -= characters;
		}
		advance() {
			this._currentPosition++;
		}
		getNext() {
			var result = this._eofCharacter;
			if (this.hasNext) {
				result = this._sourceText[this._currentPosition];
				this._currentPosition++;
			}
			return result;
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
}
