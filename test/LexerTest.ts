///<reference path="./../typings/node/node.d.ts" />
import fs = require("fs");

import Lexer = require("./../source/frontend/Lexer");
import Token = require("./../source/frontend/Tokens/Token");
import TokenKind = require("./../source/frontend/Tokens/TokenKind");
import Eof = require("./../source/frontend/Tokens/Eof");
import StringUtils = require("./../source/utilities/StringUtils");


function getTokenList(sourceFile: string) {
	var list = new Array<Token>();
	var source = fs.readFileSync(this.sourceFile, "utf-8");
	var lexer = new Lexer(source);
	var t: Token = null;
	while(!((t = lexer.getNextToken()) instanceof Eof)) {
		list.push(t);
	}
	list.push(new Eof());
	return list;
}

function printTokenList(target: Console, sourceFile: string) {
	var row: number = 1;
	var col: number = 1;
	var previousTokenLength = 0;

	this.getTokenList().forEach((t:Token) => {
		
		col += previousTokenLength;
		
		var position = "[" + StringUtils.pad(row.toString(), " ", 3, true)
					 + ", " + StringUtils.pad(col.toString(), " ", 3, true)
					 + "]";

		var str = StringUtils.pad(position, " ", 12)
				+ StringUtils.pad(TokenKind[t.getKind()], "-", 30)
				+ " | '" + t.toString() + "'";

		switch(t.getKind()) {
			case TokenKind.WhitespaceLineFeed:
				previousTokenLength = 0;
				col = 1;
				row++;
				break;
			case TokenKind.WhitespaceSpace:
				previousTokenLength = 1;
				break;
			case TokenKind.WhitespaceTab:
				previousTokenLength = 4;
				break;
			default:
				previousTokenLength = t.toString().length;
				break;		
		}
		target.log(str);
	});
}

printTokenList(console, "./testfiles/simple.ooc");