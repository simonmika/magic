import Token = require("./Token");
import WhitespaceCharacters = require("./WhitespaceCharacters");

class Whitespace extends Token
{
	private kind: WhitespaceCharacters;
	private kindString: string;
	
	constructor(whitespace: string) {
		super(whitespace);
		this.setKind(whitespace.charCodeAt(0));
	}
	
	getKind() {
		return this.kind;
	}
	
	toString() {
		return this.kindString;
	}
	
	private setKind(charCode: number) {
		switch(charCode) {
			case 0:
				this.kind = WhitespaceCharacters.Null;
				this.kindString = "Null";
				break;
			case 9:
				this.kind = WhitespaceCharacters.Tab;
				this.kindString = "Tab";
				break;
			case 10:
				this.kind = WhitespaceCharacters.LF;
				this.kindString = "LF";
				break;
			case 13:
				this.kind = WhitespaceCharacters.CR;
				this.kindString = "CR";
				break;
			case 32:
				this.kind = WhitespaceCharacters.Space;
				this.kindString = "Space";
				break;
			default:
				throw new Error("Unknown whitespace character, character code: " + charCode);				
		}
	}	
}

export = Whitespace;