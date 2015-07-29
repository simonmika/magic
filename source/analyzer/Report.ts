import Violation = require("./Violation");

class Report {
	private _violations = new Array<Violation>();
	constructor() { }
	get violations() { return this._violations; }
	addViolation(violaton: Violation) {
		this._violations.push(violaton);
	}
}

export = Report;