module Magic.Frontend {
	export class TokenLocation {
		constructor(private _filename: string, private _line: number, private _column: number) { }
		get filename() { return this._filename; }
		get line() { return this._line; }
		get column() { return this._column; }
		toString() {
			return "[" + this._line + ", " + this._column + "]"
		}
	}
}
