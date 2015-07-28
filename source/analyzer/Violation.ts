import TokenLocation = require("./../frontend/TokenLocation")

class Violation {
	constructor(private _location: TokenLocation, private _message: string, private _name: string) { }
	get location() { return this._location; }
	get message() { return this._message; }
	get name() { return this._name; }
}

export = Violation;