import fs = require("fs");

import Lexer = require("./Lexer");
import Token = require("./Tokens/Token");
import TokenKind = require("./Tokens/TokenKind");
import Eof = require("./Tokens/Eof");
import ParseTree = require("./ParseTree");

import StringUtils = require("./../utilities/StringUtils");

class Parser
{
	constructor(private sourceFile: string) {}
		
	printTokenList(target: Console) {
		var source = fs.readFileSync(this.sourceFile, "utf-8");
		var lexer = new Lexer(source);
		var t: Token;
		while(!((t = lexer.getNextToken()) instanceof Eof)) {
			// var str = StringUtils.pad(t.constructor.name, "-", 18) + "| '" + t.toString() + "'";
			var str = StringUtils.pad(TokenKind[t.getKind()], "-", 30) + "| '" + t.toString() + "'";
			target.log(str);
		}
	}
	
}

export = Parser;