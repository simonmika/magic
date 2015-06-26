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
			// Keyword, identifier or boolean literal
			else if(this.isValidIdentifierCharacter(current, true)) {
				result = this.handleWord(current);
			}
			// Operator
			else if(Operator.isOperator(current) || (current === "." && peek === ".")) {
				result = this.handleOperator(current);
			}
			// Separator
			else if(Separator.isSeparator(current)) {
				result = this.handleSeparator(current);
			}
			// Numeric literal
			else if(this.isDigit(current)) {
				result = this.handleNumericLiteral(current);
			}
			// String literal
			else if(current == "\"") {
				result = this.handleStringLiteral();
			}
			// Unknown (we should never arrive here)
			else {
				throw new Error("Lexer: Unable to handle '" + current + "'");
			}
		} else {
			result = new Token("\0", TokenKind.Eof);
		}
		return result;
	}
	
	private handleStringLiteral() {
		var literal = "";
		while(this.reader.hasNext()) {
			if(this.reader.peek() === "\"") {
				break;
			}
			literal += this.reader.getNext();
		}
		this.reader.ignoreNext();
		return new Token(literal, TokenKind.LiteralString);
	}
	
	//
	// TODO: Check for hexadecimal/binary notation?
	//
	private handleNumericLiteral(firstChar: string) {
		var literal = firstChar;
		var peek: string;
		var next: string;
		var foundDot = false;
		while(this.reader.hasNext() && this.nextIsDigit(!foundDot)) {
			next = this.reader.getNext();
			peek = this.reader.peek();
			if(next === ".") {
				// See if we're in fact dealing with the range operator '..'.
				// This will currently be the case if we have an expression such as 'for(i in 0..n)'
				if(peek === ".") {
					// Re-position reader so that the range operator '..' can be captured.
					this.reader.rewind(1);
					break;
				}
				foundDot = true;
			}
			literal += next;
		}
		if(peek === "f") {
			// Throw away trailing float literal suffix.
			this.reader.ignoreNext();
		} 
		return new Token(literal, TokenKind.LiteralNumber);
	}
	
	private handleSeparator(firstChar: string) {
		var result: Token;
		var peek = this.reader.peek();
		// Since ':' is a separator, we need to consider operators :=, :== and ::= here.
		if(firstChar === ":" && (peek === "=" || peek === ":")) {
			result = this.handleOperator(firstChar);
		} else {
			result = new Token(firstChar, Separator.toKind(firstChar));
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
		// Since both '..' and '/' are operators, the path component '../' will
		// be constructed in this method, so we need to check for it.
		if(op === "../") {
			result = new Token(op, TokenKind.PathComponent);
		} else {
			result = new Token(op, Operator.toKind(op));
		}
		return result;
	}
	
	private handleWord(firstChar: string) {
		var result: Token;
		var word = firstChar;
		while(this.reader.hasNext()) {
			if(!this.nextIsValidIdentifierCharacter(false)) {
				break;
			}
			word += this.reader.getNext();
		}
		var keywordKind = Keyword.toKind(word);
		if(keywordKind != TokenKind.Unknown) {
			// If word is keyword 'true' or 'false', we'll demote it to a boolean literal.
			// This will probably simplify the parsing process a bit (open for investigation).
			switch(keywordKind) {
				case TokenKind.KeywordTrue:
				case TokenKind.KeywordFalse:
					result = new Token(word, TokenKind.LiteralBoolean);
					break;
				default:
					result = new Token(word, keywordKind);
					break;
			}
		} else {
			result = new Token(word, TokenKind.Identifier);
		}
		return result;
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
	
	private nextIsDigit(acceptDot = false) {
		return this.isDigit(this.reader.peek(), acceptDot);
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
	
	private isDigit(c: string, acceptDot = false) {
		var charCode = c.charCodeAt(0);
		return (charCode > 47 && charCode < 58) || (acceptDot ? c == "." : false);
	}
}

export = Lexer;