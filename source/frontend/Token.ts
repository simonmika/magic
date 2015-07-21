import TokenKind = require("./TokenKind");
import TokenLocation = require("./TokenLocation");

class Token {
	constructor(private _location: TokenLocation, private _kind: TokenKind, private _value: string) { }
	get location() { return this._location; }
	get kind() { return this._kind; }
	get value() { return this._value; }
	toString() {
		return this.location.toString() + " [" + TokenKind[this.kind] + " = '" + this.value + "']";
	}
}

export = Token;