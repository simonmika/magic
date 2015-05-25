import Scanner from './Scanner';

export default class Lexer {
	private scanner: Scanner;
	
	constructor(private sourceString: string) {
		this.scanner = new Scanner(sourceString);
	}

}