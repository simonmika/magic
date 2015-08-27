/// <reference path="../Error/Region" />

module Magic.Tokens {
	export class Token {
		constructor(private region: Error.Region) { }
		getRegion() { return this.region; }
		toString() {
			return this.region.toString()
		}
		isSeparator(symbol: string = null): boolean {
			return false
		}
		isIdentifier(name: string = null): boolean {
			return false
		}
		isOperator(symbol: string = null): boolean {
			return false
		}
	}
}
