import CharacterReader = require("./CharacterReader");
import Token = require("./Token");
import TokenKind = require("./TokenKind");
import Keyword = require("./Keyword");
import Operator = require("./Operator");
import Separator = require("./Separator");
import Whitespace = require("./Whitespace");

class Lexer
{
	private reader: CharacterReader = null;
	
	constructor(sourceText: string) {
		this.reader = new CharacterReader(sourceText);
	}
	
	getNextToken() {
		var result: Token = null;
		
		if(this.reader.hasNext()) {
			var current = this.reader.getNext();
			var peek = this.reader.peek();
			
			// Whitespace
			if(Whitespace.isWhitespace(current)) {
				result = new Token(current, Whitespace.toKind(current));
			}
			// Comment
			else if(current === "/" && (peek === "/" || peek === "*")) {
				result = this.handleComment();
			}
			// Keyword or identifier
			else if(this.isValidIdentifierCharacter(current, true)) {
				result = this.handleIdentifier(current);
			}
			// Operator
			else if(Operator.isOperator(current)) {
				result = this.handleOperator(current);
			}
			// Separator
			
		} else {
			result = new Token("\0", TokenKind.Eof);
		}
		return result;
	}
	
	private handleOperator(firstChar: string) {
		var op = firstChar;
		var result: Token;
		while(this.reader.hasNext()) {
			if(this.nextIsAlphaNumeric(true) || this.nextIsWhitespace()) {
				break;
			}
			op += this.reader.getNext();
		}
		result = new Token(op, Operator.toKind(op));
		return result;
	}
	
	private handleIdentifier(firstChar: string) {
		var word = firstChar;
		while(this.reader.hasNext()) {
			if(!this.nextIsValidIdentifierCharacter(true)) {
				break;
			}
			word += this.reader.getNext();
		}
		return Keyword.isKeyword(word) ? new Token(word, Keyword.toKind(word)) : new Token(word, TokenKind.Identifier);
	}

	private handleComment() {
		// We know that the next character is either a '/' or a '*'.
		return this.reader.getNext() === "/" ? this.handleLineComment() : this.handleBlockComment();		
	}
	
	private handleLineComment() {
		var text = "";
		while(this.reader.hasNext()) {
			if(this.reader.peek() === CharacterReader.LineFeedCharacter) {
				break;
			}
			text += this.reader.getNext();
		}
		return new Token(text, TokenKind.LineComment);
	}

	private handleBlockComment() {
		var text = "";
		var c: string;
		while(this.reader.hasNext()) {
			c = this.reader.getNext();
			if(c === "*" && this.reader.peek() === "/") {
				break;
			} else {
				text += c;
			}
		}
		// Throw away trailing '/'
		this.reader.ignoreNext();
		return new Token(text, TokenKind.BlockComment);
	}
	
	private nextIsAlphaNumeric(acceptUnderscore = false) {
		return this.isAlphaNumeric(this.reader.peek(), acceptUnderscore);
	}
	
	private nextIsValidIdentifierCharacter(first = false) {
		return this.isValidIdentifierCharacter(this.reader.peek(), first);
	}
	
	private nextIsWhitespace() {
		return Whitespace.isWhitespace(this.reader.peek());
	}
	
	// Identifiers must start with a letter or an underscore.
	private isValidIdentifierCharacter(c: string, first = false) {
		return first ? (this.isLetter(c) || c === "_") : this.isAlphaNumeric(c, true);
	}
	
	private isAlphaNumeric(c: string, acceptUnderscore = false) {
		return this.isLetter(c) || this.isDigit(c) || (acceptUnderscore && c === "_");
	}
	
	private isLetter(c: string) {
		var charCode = c.charCodeAt(0);
		return (charCode > 64 && charCode < 91)  || (charCode > 96 && charCode < 123)
	}
	
	private isDigit(c: string) {
		var charCode = c.charCodeAt(0);
		return charCode > 47 && charCode < 58;
	}
	
	
}

export = Lexer;