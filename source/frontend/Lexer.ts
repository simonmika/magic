import Scanner = require("./Scanner");

import Token = require("./Tokens/Token");
import Eof = require("./Tokens/Eof");
import Comment = require("./Tokens/Comment");
import Operator = require("./Tokens/Operator");
import Separator = require("./Tokens/Separator");
import Whitespace = require("./Tokens/Whitespace");
import Keyword = require("./Tokens/Keyword");
import Identifier = require("./Tokens/Identifier");
import NumericLiteral = require("./Tokens/NumericLiteral");
import StringLiteral = require("./Tokens/StringLiteral");

class Lexer
{
	private scanner: Scanner = null;
	
	constructor(sourceText: string) {
		this.scanner = new Scanner(sourceText);
	}
	
	getNextToken() {
		var result: Token = null;
		
		if(this.scanner.hasNext()) {
				
			var current = this.scanner.getNext();
			var peekChar = this.scanner.peek();
			
			// Whitespace
			if(this.isWhitespace(current)) {
				result = this.handleWhitespace(current);
			}
			// Comment
			else if(current === "/" && (peekChar === "/" || peekChar === "*")) {
				result = this.handleComment();
			}
			// Operator.
			else if(Operator.isOperator(current) || (current === "." && peekChar === ".")) {
				result = this.handleOperator(current);
			}
			// Keyword and Identifier
			else if(this.isValidIdentifierCharacter(current, true)) {
				result = this.handleIdentifier(current);
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
			else if(current === "\"") {
				result = this.handleStringLiteral();
			}
			// Source line break (treat as Token?)
			else if(current === "\\") {
				result = this.getNextToken();
			}
			// We should never reach this point.
			else {
				throw new Error("Unknown token: '" + current + "'");
			}
		} else {
			result = new Eof();
		}
		return result;
	}
	
	//
	// first can be a single character or something like "../"
	//
	private handleIdentifier(first: string) {
		var word = first;
		while(this.scanner.hasNext()) {
			if(!this.nextIsAlphaNumeric(true)) {
				break;
			}
			word += this.scanner.getNext();
		}
		return Keyword.isKeyword(word) ? new Keyword(word) : new Identifier(word);
	}
	
	private handleWhitespace(whitespace: string) {
		return new Whitespace(whitespace);
	}
	
	private handleOperator(firstChar: string) {
		var result: Token;
		var op = firstChar;
		while(this.scanner.hasNext()) {
			if(this.nextIsAlphaNumeric(true) || this.nextIsWhitespace() || this.nextIsSeparator()) {
				break;
			}
			op += this.scanner.getNext();
		}
		// Leave this check here for now...
		if(!Operator.isOperator(op)) {
			// Consider the case where op = "../"
			if(op === "../") {
				result = this.handleIdentifier(op);
			} else {
				throw new Error("Parsed operator is not an operator, op: '" + op + "'");
			}
		} else {
			result = new Operator(op);
		}
		return result;
	}
	
	private handleSeparator(firstChar: string) {
		var result: Token;
		// Check for operator. Colon is a separator, but it can
		// also be part of an operator, such as := and :==.
		// It's much cheaper to peek, but we'll do it like this
		// for now. We also need to consider the case '(=someVariable'
		if(firstChar !== "(" && this.nextIsOperator()) {
			result = this.handleOperator(firstChar);
		} else {
			result = Separator.create(firstChar);
		}
		return result;
	}
	
	private handleNumericLiteral(firstNumberLiteral: string) {
		var literal = firstNumberLiteral;
		while(this.scanner.hasNext()) {
			if(!this.nextIsDigit(true)) {
				break;
			}
			literal += this.scanner.getNext();
		}
		if(NumericLiteral.isFloat(literal)) {
			this.scanner.ignoreNext(); // Ignore trailing 'f'
		}
		return NumericLiteral.create(literal);
	}
	
	private handleStringLiteral() {
		var literal = "";
		while(this.scanner.hasNext()) {
			if(this.scanner.peek() === "\"") {
				break;
			}
			literal += this.scanner.getNext();
		}
		this.scanner.ignoreNext(); // Ignore trailing "
		return new StringLiteral(literal);
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
	
	private nextIsDigit(includeDecimalPoint = false) {
		return 	this.isDigit(this.scanner.peek()) ||
				(includeDecimalPoint ? this.scanner.peek() == "." : false);
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
	
	private nextIsSeparator() {
		return Separator.isSeparator(this.scanner.peek());
	}
	
	private nextIsOperator() {
		return Operator.isOperator(this.scanner.peek());
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
		return c === " " || c === "\t" || c === "\r" || c === "\n" || c === " ";
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