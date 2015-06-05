///<reference path="./../typings/node/node.d.ts" />
import fs = require("fs");
import Parser = require("./frontend/Parser");

var sourceFile = "./../test/testfiles/tricky.ooc";
var parser = new Parser(sourceFile);

try {
	parser.printTokenList(console);
} catch(Error) {
	console.log("ERROR: -> " + Error.message);
}
