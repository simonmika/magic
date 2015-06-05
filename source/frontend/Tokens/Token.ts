import TokenKind = require("./TokenKind");

class Token
{
	constructor(private tokenValue: string, private tokenKind: TokenKind) { }
	
	getKind() {
		return this.tokenKind;
	}
	
	toString() {
		return this.tokenValue;
	}
}

export = Token;