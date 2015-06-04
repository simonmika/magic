import Scanner = require("./Scanner");
import Token = require("./Tokens/Token");
import Comment = require("./Tokens/Comment");

class Lexer
{
	private scanner: Scanner = null;
	
	constructor(sourceText: string) {
		this.scanner = new Scanner(sourceText);
	}
	
	getNextToken() {
		var result: Token;
		
		if(this.scanner.hasNext()) {
			
			var char = this.scanner.getNext();
			var peekChar = this.scanner.peek();
			
			// Check for whitespace
			if(this.isWhitespace(char)) {
				result = this.handleWhitespace(char);
			}
			// Check for comment
			else if(char === "/" && (peekChar === "/" || peekChar === "*")) {
				result = this.handleComment();	
			}
		}
		
		return result;
	}
	
	private handleWhitespace(whitespace: string) {
		return null;
	}
	
	private handleComment() {
		// We know that the next character is either "/" or "*".
		return this.scanner.getNext() === "/" ? this.handleLineComment() : this.handleBlockComment();
	}
	
	private handleLineComment() {
		var text: string = "";
		while(this.scanner.hasNext()) {
			if(this.nextIsNewLine()) {
				break;
			}
			text += this.scanner.getNext();
		}
		return new Comment(text, false);
	}
	
	// This is currently ignoring the case where a new block comment is started within
	// another block comment. It also does not actively notify the user in the case where
	// a block comment is not terminated, i.e. EOF before "*/".
	private handleBlockComment() {
		var text: string = "";
		while(this.scanner.hasNext()) {
			var c = this.scanner.getNext();
			if(c === "*" && this.scanner.peek() === "/") {
				break;
			} else {
				text += c;
			}
		}
		// Throw away trailing "/"
		this.scanner.ignoreNext();
		return new Comment(text, true);
	}
	
	private nextIsDigit() {
		return this.isDigit(this.scanner.peek());
	}
	
	private nextIsLetter() {
		return this.isLetter(this.scanner.peek());
	}
	
	private nextIsNewLine() {
		return this.scanner.peek() === Scanner.LineFeedCharacter;
	}
	
	private isValidIdentifierCharacter(c: string, first: boolean = false) {
		return first ? this.isLetter(c, true) : this.isAlphaNumeric(c, true);
	}
	
	private isAlphaNumeric(c: string, includeUnderscore: boolean = false) {
		return this.isLetter(c, includeUnderscore) || this.isDigit(c);
	}
	
	private isWhitespace(c: string) {
		return c === " " || c === "\t" || c === "\n" || c === "\r" || c === " ";
	}
	
	private isDigit(c: string) {
		var charCode = c.charCodeAt(0);
		return charCode > 47 && charCode < 58;
	}
	
	private isLetter(c: string, acceptUnderscore: boolean = false) {
		var charCode = c.charCodeAt(0);
		return 	(charCode > 64 && charCode < 91)  ||
				(charCode > 96 && charCode < 123) ||
				(acceptUnderscore ? charCode === 95 : false);
	}
	
}

export = Lexer;