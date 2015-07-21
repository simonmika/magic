///<reference path="./../typings/node/node.d.ts" />

try {
	console.log("foobar");
} catch(Error) {
	console.log("ERROR: -> " + Error.message);
}
