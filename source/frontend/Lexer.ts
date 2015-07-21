import CharacterReader = require("./CharacterReader");
import Glossary = require("./Glossary");
import Token = require("./Token");
import TokenKind = require("./TokenKind");
import TokenLocation = require("./TokenLocation");

class Lexer {

	private reader: CharacterReader;

	constructor(private sourceFile: string, private glossary: Glossary) {
		this.reader = new CharacterReader(sourceFile);
	}

	getNextToken() {
		var result: Token = null;
		if (this.reader.hasNext) {
			var current = this.reader.getNext();
			var peek = this.reader.peek();
			result = new Token(this.reader.location, TokenKind.Unknown, current);
		} else {
			result = new Token(this.reader.location, TokenKind.Eof, "\0");
		}
		return result;
	}

}

export = Lexer;