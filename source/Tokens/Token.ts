/// <reference path="../IO/Region" />

module Magic.Tokens {
	export class Token {
		constructor(private original: string, private region: IO.Region) { }
		getRegion() { return this.region; }
		getOriginal() { return this.original; }
		toString() {
			return this.region.toString() + ": " + this.original;
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
