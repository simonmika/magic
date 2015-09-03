/// <reference path="../Error/Region" />

module Magic.Tokens {
	export class Token {
		constructor(private region: Error.Region) { }
		getRegion() { return this.region; }
		toString() {
			return this.region.toString()
		}
		isSeparator(symbol?: string): boolean {
			throw "isSeparator() called from base"
		}
		isIdentifier(name?: string): boolean {
			throw "isIdentifier() called from base"
		}
		isOperator(symbol?: string): boolean {
			throw "isOperator() called from base"
		}
	}
}
