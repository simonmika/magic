import TokenKind = require("./TokenKind");

class Separator
{
	private static separators: { [key: string]: TokenKind; } = {
		":": TokenKind.SeparatorColon,
		",": TokenKind.SeparatorComma,
		"[": TokenKind.SeparatorLeftBracket,
		"{": TokenKind.SeparatorLeftCurly,
		"(": TokenKind.SeparatorLeftParanthesis,
		"]": TokenKind.SeparatorRightBracket,
		"}": TokenKind.SeparatorRightCurly,
		")": TokenKind.SeparatorRightParanthesis
	};
		
	static isSeparator(separator: string) {
		return Separator.toKind(separator) !== TokenKind.Unknown;
	}
	
	static toString(separator: TokenKind) {
		var result: string = null;
		for(var key in Separator.separators) {
			if(Separator.separators[key] == separator) {
				result = key;
			}
		}
		return result;
	}
	
	static toKind(separator: string) {
		var result = Separator.separators[separator];
		return result === undefined ? TokenKind.Unknown : result;
	}
}

export = Separator;