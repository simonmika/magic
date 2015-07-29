import TokenLocation = require("./../frontend/TokenLocation")
import RuleKind = require("./RuleKind");

class Violation {
	constructor(private _location: TokenLocation, private _message: string, private _kind: RuleKind) { }
	get location() { return this._location; }
	get message() { return this._message; }
	get kind() { return this._kind; }
}

export = Violation;