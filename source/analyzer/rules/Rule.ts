import Token = require("./../../frontend/Token");
import Report = require("./../Report");

//
// TODO: The analyzer should not work with a list of tokens.
// Instead, it should work with a proper parse tree.
//
interface Rule {
	run(tokens: Array<Token>, report: Report): void;
}

export = Rule;