/// <reference path="TokenKind" />
/// <reference path="TokenLocation" />

class Token {
	static get empty() {  return new Token(new TokenLocation("", 0, 0), TokenKind.Unknown, ""); }
	constructor(private _location: TokenLocation, private _kind: TokenKind, private _value: string, private _addToLength = 0) { }
	get location() { return this._location; }
	get kind() { return this._kind; }
	get value() { return this._value; }
	// calculates the total length of the token, including pre/postfix characters.
	// For example, a line comment is of length '//' + value = 2 + value.length
	get length() { return this._value.length + this._addToLength; }
	toString() {
		return this.location.toString() + " [" + TokenKind[this.kind] + " = '" + this.value + "']";
	}
}
