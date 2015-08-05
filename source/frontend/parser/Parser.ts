import Lexer = require("./../Lexer");
import Glossary = require("./../Glossary");
import TokenReader = require("./../TokenReader");

class Parser {
	private tokenReader: TokenReader;
	constructor(file: string, glossary: Glossary) {
		this.tokenReader = new TokenReader(new Lexer(file, glossary));
	}

	parse() {
		
	}

}

export = Parser;