/// <reference path="../Error/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />

module Magic.Tokens {
	export class Gap extends Token {
		constructor(original: string, region: Error.Region) {
			super(original, region)
		}
	}
}
