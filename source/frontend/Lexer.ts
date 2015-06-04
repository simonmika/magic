import Scanner = require("./Scanner");

import Token = require("./Tokens/Token");
import Comment = require("./Tokens/Comment");
import Operator = require("./Tokens/Operator");
import Separator = require("./Tokens/Separator");
import Whitespace = require("./Tokens/Whitespace");

class Lexer
{
	private scanner: Scanner = null;
	
	constructor(sourceText: string) {
		this.scanner = new Scanner(sourceText);
	}
	
	getNextToken() {
		var result: Token;
		
		if(this.scanner.hasNext()) {
			
			var current = this.scanner.getNext();
			var peekChar = this.scanner.peek();
			
			// Check for whitespace
			if(this.isWhitespace(current)) {
				result = this.handleWhitespace(current);
			}
			// Check for operator
			else if(Operator.isOperator(current)) {
				result = this.handleOperator(current);
			}
			// Check for separator. DotDot is a special case since float literals
			// may begin with a dot.
			else if(current === "." || Separator.isSeparator(current)) {
				result = this.handleSeparator(current);
			}
			// Check for comment
			else if(current === "/" && (peekChar === "/" || peekChar === "*")) {
				result = this.handleComment();
			}
		}
		return result;
	}
	
	private handleWhitespace(whitespace: string) {
		return new Whitespace(whitespace);
	}
	
	private handleOperator(firstChar: string) {
		var op = firstChar;
		while(this.scanner.hasNext()) {
			if(this.nextIsAlphaNumeric(true) || this.nextIsWhitespace()) {
				break;
			}
			op += this.scanner.getNext();
		}
		// Leave this check here for now...
		if(!Operator.isOperator(op))
			throw new Error("Parsed operator is not an operator, op: '" + op + "'");

		return new Operator(op);
	}
	
	private handleSeparator(firstChar: string) {
		var result: Token;
		
		// Check for FloatLiteral
		if(this.nextIsDigit()) {
			result = this.handleNumericLiteral(firstChar);
		}
		// Check for DotDot
		else if(firstChar == "." && this.scanner.peek() == ".") {
			firstChar += this.scanner.getNext();
			result = Separator.create(firstChar);
		}
		// Check for operator. Colon is a separator, but it can
		// also be part of an operator, such as := and :==.
		// It's much cheaper to peek, but we'll do it like this
		// for now.
		else if(Operator.isOperator(this.scanner.peek())) {
			result = this.handleOperator(firstChar);
		}
		// Looks like we got a separator
		else {
			result = Separator.create(firstChar);
		}
		return result;
	}
	
	private handleNumericLiteral(firstNumberLiteral: string) {
		return null;
	}
	
	private handleComment() {
		// We can safely assume that the next character is either "/" or "*".
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
	// another block comment. It also does not notify the user in the case where
	// a block comment is not terminated, i.e. EOF before "*/".
	private handleBlockComment() {
		var text: string = "";
		var c: string;
		while(this.scanner.hasNext()) {
			c = this.scanner.getNext();
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
	
	private nextIsWhitespace() {
		return this.isWhitespace(this.scanner.peek());
	}
	
	private nextIsAlphaNumeric(includeUnderscore: boolean = false) {
		return this.isAlphaNumeric(this.scanner.peek(), includeUnderscore)
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