import TokenKind = require("./TokenKind");

class Whitespace
{
	private static whitespaceCharacters: { [key: string]: TokenKind; } = {
		"\r": TokenKind.WhitespaceCarriageReturn,
		"\n": TokenKind.WhitespaceLineFeed,
		"\t": TokenKind.WhitespaceTab,
		"\0": TokenKind.WhitespaceNull,
		" ": TokenKind.WhitespaceSpace
	};

	static isWhitespace(whitespace: string) {
		return Whitespace.toKind(whitespace) !== TokenKind.Unknown;
	}
	
	static toString(whitespace: TokenKind) {
		var result: string = null;
		for(var key in Whitespace.whitespaceCharacters) {
			if(Whitespace.whitespaceCharacters[key] == whitespace) {
				result = key;
			}
		}
		return result;
	}
	
	static toKind(whitespace: string) {
		var result = Whitespace.whitespaceCharacters[whitespace];
		return result === undefined ? TokenKind.Unknown : result;
	}
}

export = Whitespace;