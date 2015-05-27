import Token from './Token';

export enum WhitespaceCharacters {
	Null,
	Tab = 9,
	LF = 10,
	CR = 13,
	Space = 32
}

export default class Whitespace extends Token {
	
	constructor(value: string) {
		super(value);
	}
	
	static isWhitespace(charCode: number) {
		return	charCode === WhitespaceCharacters.Tab ||
				charCode === WhitespaceCharacters.LF ||
				charCode === WhitespaceCharacters.CR ||
				charCode === WhitespaceCharacters.Space;
	}
}