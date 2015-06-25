///<reference path="./../typings/node/node.d.ts" />

import Parser = require("./frontend/Parser");

var sourceFile = "./../test/testfiles/expression.ooc";

try {

	var parser = new Parser(sourceFile);
	console.log(parser.parse().toString());

} catch(Error) {
	console.log("ERROR: -> " + Error.message);
}
