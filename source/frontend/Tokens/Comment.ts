import Token = require("./Token");
import TokenKind = require("./TokenKind");

class Comment extends Token
{
	constructor(private text: string, private blockComment: boolean) {
		super(text, TokenKind.Comment);
	}

	getText() {
		return this.text;
	}
	
	isBlockComment() {
		return this.blockComment;
	}
	
	toString() {
		return (this.blockComment ? "/*" : "//") + this.text + (this.blockComment ? "*/" : "");
	}
}

export = Comment;