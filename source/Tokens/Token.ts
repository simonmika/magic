/// <reference path="../IO/Region" />

module Magic.Tokens {
	export class Token {
		get region() { return this._region; }
		get value() { return this._value; }
		constructor(private _region: IO.Region, private _value: string) { }
		toString() {
			return this.region.toString() + ": " + this.value;
		}
	}
}
