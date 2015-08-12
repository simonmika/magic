/// <reference path="./../Lexer" />
/// <reference path="./../Glossary" />
/// <reference path="./../TokenReader" />

class Parser {
	private tokenReader: TokenReader;
	constructor(file: string, glossary: Glossary) {
		this.tokenReader = new TokenReader(new Lexer(file, glossary));
	}

	parse() {

	}

}
