import TokenKind = require("./TokenKind");
import TokenLocation = require("./TokenLocation");

class Token {
	constructor(private _location: TokenLocation, private _kind: TokenKind, private _value: string, private _addToLength = 0) { }
	get location() { return this._location; }
	get kind() { return this._kind; }
	get value() { return this._value; }
	// calculates the total length of the token, including pre/postfix characters.
	// For example, a line comment is of length '//' + value.
	get length() {
		return this._value.length + this._addToLength;
	}
	toString() {
		return this.location.toString() + " [" + TokenKind[this.kind] + " = '" + this.value + "']";
	}
}

export = Token;