///<reference path="./../typings/node/node.d.ts" />

import Parser = require("./frontend/Parser");
var sourceFile = "./../test/testfiles/operators.ooc";

try {
	var p = new Parser(sourceFile);
	p.test();
} catch(Error) {
	console.log("ERROR: -> " + Error.message);
}
