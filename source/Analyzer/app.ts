///<reference path='../../typings/node/node.d.ts' />
///<reference path='../../typings/colors/colors.d.ts' />
import fs = require('fs');
import colors = require('colors'); // npm install colors

import Lexer from './Tokens/Lexer';

var filename = "../../test/comments.ooc";
var sourceString = fs.readFileSync(filename, "utf-8");
var lexer = new Lexer(sourceString);

function test() {
	try {
		lexer.test();
	} catch(Error) {
		var where = filename + ":[" + lexer.getLineNumber() + ", " + lexer.getColumnNumber() + "]";
		console.log(colors.yellow(where));
		console.log(colors.red("\t%s"), Error.message);
		test();
	}	
}

test();