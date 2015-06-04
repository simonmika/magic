import Token = require("./Token");
import WhitespaceCharacters = require("./WhitespaceCharacters");

class Whitespace extends Token
{
	private kind: WhitespaceCharacters;
	
	constructor(whitespace: string) {
		super(whitespace);
		this.setKind(whitespace.charCodeAt(0));
	}
	
	getKind() {
		return this.kind;
	}
	
	toString() {
		var result: string;
		switch(this.kind) {
			case WhitespaceCharacters.Null:
				result = "Null";
				break;
			case WhitespaceCharacters.Tab:
				result = "Tab";
				break;
			case WhitespaceCharacters.LF:
				result = "LF";
				break;
			case WhitespaceCharacters.CR:
				result = "CR";
				break;
			case WhitespaceCharacters.Space:
				result = "Space";
				break;
		}
		return result;
	}
	
	private setKind(charCode: number) {
		switch(charCode) {
			case 0:
				this.kind = WhitespaceCharacters.Null;
				break;
			case 9:
				this.kind = WhitespaceCharacters.Tab;
				break;
			case 10:
				this.kind = WhitespaceCharacters.LF;
				break;
			case 13:
				this.kind = WhitespaceCharacters.CR;
				break;
			case 32:
				this.kind = WhitespaceCharacters.Space;
				break;
			default:
				throw new Error("Unknown whitespace character, character code: " + charCode);				
		}
	}	
}

export = Whitespace;