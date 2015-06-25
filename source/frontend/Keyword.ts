import TokenKind = require("./TokenKind");

class Keyword
{
	private static keywords: { [key: string]: TokenKind; } = {
		"__onheap__": TokenKind.KeywordOnHeap,
		"this": TokenKind.KeywordThis,
		"This": TokenKind.KeywordStaticThis,
		"virtual": TokenKind.KeywordVirtual,
		"override": TokenKind.KeywordOverride,
		"break": TokenKind.KeywordBreak,
		"continue": TokenKind.KeywordContinue,
		"return": TokenKind.KeywordReturn,
		"func": TokenKind.KeywordFunc,
		"class": TokenKind.KeywordClass,
		"cover": TokenKind.KeywordCover,
		"enum": TokenKind.KeywordEnum,
		"interface": TokenKind.KeywordInterface,
		"from": TokenKind.KeywordFrom,
		"abstract": TokenKind.KeywordAbstract,
		"final": TokenKind.KeywordFinal,
		"static": TokenKind.KeywordStatic,
		"inline": TokenKind.KeywordInline,
		"extends": TokenKind.KeywordExtends,
		"extern": TokenKind.KeywordExtern,
		"unmangled": TokenKind.KeywordUnmangled,
		"implements": TokenKind.KeywordImplements,
		"implicit": TokenKind.KeywordImplicit,
		"import": TokenKind.KeywordImport,
		"include": TokenKind.KeywordInclude,
		"use": TokenKind.KeywordUse,
		"if": TokenKind.KeywordIf,
		"else": TokenKind.KeywordElse,
		"for": TokenKind.KeywordFor,
		"while": TokenKind.KeywordWhile,
		"match": TokenKind.KeywordMatch,
		"case": TokenKind.KeywordCase,
		"as": TokenKind.KeywordAs,
		"in": TokenKind.KeywordIn,
		"into": TokenKind.KeywordInto,
		"proto": TokenKind.KeywordProto,
		"try": TokenKind.KeywordTry,
		"catch": TokenKind.KeywordCatch,
		"set": TokenKind.KeywordSet,
		"get": TokenKind.KeywordGet,
		"operator": TokenKind.KeywordOperator,
		"const": TokenKind.KeywordConst,
		"true": TokenKind.KeywordTrue,
		"false": TokenKind.KeywordFalse,
		"null": TokenKind.KeywordNull,
	};
	
	static isKeyword(word: string) {
		return Keyword.toKind(word) !== TokenKind.Unknown;
	}
	
	static toString(keyword: TokenKind) {
		var result: string = null;
		for(var key in Keyword.keywords) {
			if(Keyword.keywords[key] == keyword) {
				result = key;
			}
		}
		return result;
	}
	
	static toKind(keyword: string) {
		var result = Keyword.keywords[keyword];
		return result === undefined ? TokenKind.Unknown : result;
	}
}

export = Keyword;