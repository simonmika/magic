/// <reference path="../Error/Region" />
/// <reference path="Token" />
/// <reference path="Substance" />

module Magic.Tokens {
	export class Literal extends Substance {
		constructor(region: Error.Region) {
			super(region)
		}
		isLiteral(): boolean {
			return true
		}
	}
}
