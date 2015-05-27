
import Token from './Token'

export default class Comment extends Token {
	
	constructor(private text: string, private blockComment: boolean) {
		super(text); // <-- format text with comment delimeters?
	}
	
	getText() {
		return this.text;
	}
	
	isBlockComment() {
		return this.blockComment;
	}
	
	toString() {
		// Do we append a LF at the end of line comments?
		return (this.blockComment ? "/*" : "//") + this.text + (this.blockComment ? "*/" : ""/*"\n"*/);
	}
}