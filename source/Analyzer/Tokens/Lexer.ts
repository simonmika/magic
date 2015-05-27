import Scanner from './Scanner';
import Token from './Token';
import Separator from './Separator';
import Keyword from './Keyword';
import Comment from './Comment';
import Whitespace from './Whitespace'

export default class Lexer {
	
	private scanner: Scanner;
	
	constructor(sourceString: string) {
		this.scanner = new Scanner(sourceString);
	}
	
	getColumnNumber() {
		return this.scanner.getCurrentColumn();
	}
	
	getLineNumber() {
		return this.scanner.getCurrentLine();
	}
	
	test() {
		var currentChar: string;
		var currentCharCode: number;
		while(this.scanner.hasNext()) {
			currentChar = this.scanner.getNext();
			currentCharCode = currentChar.charCodeAt(0);
			if(currentChar === "/" && (this.scanner.peek() === "/" || this.scanner.peek() === "*"))
				console.log(this.handleComment().toString());
			else if(this.isWhitespace(currentCharCode))
				this.handleWhitespace(currentChar);
			/*else if(this.isSeparator(currentChar))
				this.handleSeparator(currentChar);
			else if(this.isLetter(currentCharCode))
				this.handleIdentifier(currentChar);
			else { console.log("unknown"); }*/
		}
	}
	
	private handleIdentifier(value: string) {
		return null;
	}
	
	private handleSeparator(value: string) {
		return Separator.resolve(value);
	}
	
	private handleWhitespace(value: string) {
		return new Whitespace(value);
	}
	
	private handleComment() {
		return this.scanner.getNext() === "/" ? this.handleLineComment() : this.handleBlockComment();
	}
	
	private handleLineComment() {
		var currentChar: string;
		var commentText: string = "";
		while((currentChar = this.scanner.getNext()) !== "\n" && currentChar !== null)
			commentText += currentChar;
		return new Comment(commentText, false);
	}
	
	private handleBlockComment() {
		var currentChar: string;
		var commentText: string = "";
		while(this.scanner.hasNext()) {
			currentChar = this.scanner.getNext();
			if(currentChar === "*" && this.scanner.peek() === "/")
				break;
			else if(currentChar === "/" && this.scanner.peek() === "*")
				throw new Error("Unable to start a new block comment without terminating the previous");
			else if(this.scanner.peek() === null)
				throw new Error("Unable to find block comment end marker");
			else
				commentText += currentChar;
		}
		return new Comment(commentText, true);
	}
	
	private isSeparator(value: string) {
		return Separator.isSeparator(value);
	}
	
	private isWhitespace(charCode: number) {
		return Whitespace.isWhitespace(charCode);
	}
	
	private isLetter(charCode: number) {
		return (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123);
	}
	
	private isDigit(charCode: number) {
		return charCode > 47 && charCode < 58;
	}		
}