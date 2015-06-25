import TokenKind = require("./TokenKind");

class Token
{
	constructor(private tokenValue: string, private tokenKind: TokenKind) { }
	
	getValue() {
		return this.tokenValue;
	}
	
	getKind() {
		return this.tokenKind;
	}
	
	toString() {
		return this.tokenValue;
	}
}

export = Token;