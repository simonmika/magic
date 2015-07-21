import Dictionary = require("./../utilities/Dictionary");
import TokenKind = require("./TokenKind");

class Glossary {

	private whitespaces = new Dictionary<string, TokenKind>();
	private operators = new Dictionary<string, TokenKind>();
	private keywords = new Dictionary<string, TokenKind>();

	constructor() {
		this.initialize();
	}
	isWhitespace(whitespace: string) {
		return this.whitespaces.containsKey(whitespace);
	}
	isOperator(operator: string) {
		return this.operators.containsKey(operator);
	}
	isKeyword(keyword: string) {
		return this.keywords.containsKey(keyword);
	}
	private initialize() {
		this.initializeWhitespace();
	}
	private initializeWhitespace() {
		this.whitespaces.setValue("\r", TokenKind.WhitespaceCarriageReturn);
		this.whitespaces.setValue("\n", TokenKind.WhitespaceLineFeed);
		this.whitespaces.setValue("\t", TokenKind.WhitespaceTab);
		this.whitespaces.setValue("\0", TokenKind.WhitespaceNull);
		this.whitespaces.setValue(" ", TokenKind.WhitespaceNull);
	}
}

export = Glossary;