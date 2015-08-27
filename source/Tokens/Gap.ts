/// <reference path="../Error/Region" />
/// <reference path="Token" />

module Magic.Tokens {
	export class Gap extends Token {
		constructor(region: Error.Region) {
			super(region)
		}
	}
}
