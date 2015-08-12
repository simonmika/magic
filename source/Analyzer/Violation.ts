module Magic.Analyzer {
	export class Violation {
		constructor(private _location: Frontend.TokenLocation, private _message: string, private _kind: RuleKind) { }
		get location() { return this._location; }
		get message() { return this._message; }
		get kind() { return this._kind; }
	}
}
