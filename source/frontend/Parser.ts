import fs = require("fs");

import Lexer = require("./Lexer");
import Token = require("./Tokens/Token");
import TokenKind = require("./Tokens/TokenKind");
import ParseTree = require("./ParseTree");

class Parser
{
	constructor(private sourceFile: string) {}

	test() {
		var source = fs.readFileSync(this.sourceFile, "utf-8");
		var lexer = new Lexer(source);
		var t: Token;
		while(((t = lexer.getNextToken()).getKind() !== TokenKind.Eof)) {
			console.log(TokenKind[t.getKind()] + "'" + t.toString() + "'");
		}
	}
	
}

export = Parser;