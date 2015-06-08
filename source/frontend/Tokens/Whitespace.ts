import Token = require("./Token");
import TokenKind = require("./TokenKind");

class Whitespace extends Token
{
	private kindString: string;
	
	constructor(whitespace: string) {
		super(whitespace, this.resolveKind(whitespace.charCodeAt(0)));
	}
		
	toString() {
		return this.kindString;
	}
	
	private resolveKind(charCode: number) {
		var result: TokenKind;
		switch(charCode) {
			case 0:
				result = TokenKind.WhitespaceNull;
				this.kindString = "Null";
				break;
			case 9:
				result = TokenKind.WhitespaceTab;
				this.kindString = "Tab";
				break;
			case 10:
				result = TokenKind.WhitespaceLineFeed;
				this.kindString = "LF";
				break;
			case 13:
				result = TokenKind.WhitespaceCarriageReturn;
				this.kindString = "CR";
				break;
			case 32:
				result = TokenKind.WhitespaceSpace;
				this.kindString = "Space";
				break;
			default:
				throw new Error("Unknown whitespace character, character code: " + charCode);				
		}
		return result;
	}	
}

export = Whitespace;