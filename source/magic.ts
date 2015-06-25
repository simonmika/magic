///<reference path="./../typings/node/node.d.ts" />
import fs = require("fs");

import Token = require("./frontend/Token");
import TokenKind = require("./frontend/TokenKind");
import Lexer = require("./frontend/Lexer");
import Parser = require("./frontend/Parser");

var sourceFile = "./../test/testfiles/oneline.ooc";

try {
	
	var source = fs.readFileSync(sourceFile, "utf-8");
	var lexer = new Lexer(source);
	var t: Token;
	while(((t = lexer.getNextToken()).getKind() !== TokenKind.Eof)) {
		if(t.getKind() == TokenKind.WhitespaceLineFeed) continue;
		console.log(TokenKind[t.getKind()] + " '" + t.toString() + "'");
	}
} catch(Error) {
	console.log("ERROR: -> " + Error.message);
}
