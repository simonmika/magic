import Token = require("./Token");

class Keyword extends Token 
{
	private static keywords = new Array<string>(
		"__onheap__",
		"virtual",
		"override",
		"break",
		"continue",
		"return",
		"func",
		"class",
		"cover",
		"enum",
		"interface",
		"from",
		"abstract",
		"final",
		"static",
		"inline",
		"extends",
		"extern",
		"unmangled",
		"implements",
		"implicit",
		"import",
		"include",
		"use",
		"if",
		"else",
		"for",
		"while",
		"match",
		"case",
		"as",
		"in",
		"into",
		"proto",
		"try",
		"catch",
		"set",
		"get",
		"operator",
		"const",
		"true",
		"false",
		"null"
	);
	
	constructor(keyword: string) {
		super(keyword);
	}

	static isKeyword(keyword: string) {
		return this.keywords.indexOf(keyword) > -1;
	}
}

export = Keyword;