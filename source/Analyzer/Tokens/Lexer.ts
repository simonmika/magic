import Scanner from './Scanner';
import Token from './Token';

export default class Lexer {
	private scanner: Scanner;
	
	constructor(private sourceString: string) {
		this.scanner = new Scanner(sourceString);
	}
	
	getNextToken() {
		var token: Token;
		var rawToken = this.scanner.hasNext() ? this.scanner.getNext() : null;
		
		// process whitespaces, store result!
		
		return token;
	}
	
	processWhitespace() {
		var c;
	}
}