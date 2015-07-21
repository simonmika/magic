///<reference path="./../typings/node/node.d.ts" />

import Reader = require("./frontend/CharacterReader");
import Lexer = require("./frontend/Lexer");
import Glossary = require("./frontend/Glossary");
import Dictionary = require("./utilities/Dictionary");
import Token = require("./frontend/Token");
import TokenKind = require("./frontend/TokenKind");

try {
	var glossary = new Glossary();
	var lexer = new Lexer("./../test/ooc/comment.ooc", glossary);
	var t: Token;
	while((t = lexer.getNextToken()).kind != TokenKind.Eof) {
		console.log(t.toString());
	}
} catch(Error) {
	console.log("[" + Error.filename + "] -> " + Error.toString());
}
