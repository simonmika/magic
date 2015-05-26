
export default class Comment {
	constructor(private text: string, private blockComment: boolean) { }
	
	getValue() {
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