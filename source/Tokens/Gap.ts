/// <reference path="../IO/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />

module Magic.Tokens {
	export class Gap extends Token {
		constructor(original: string, region: IO.Region) {
			super(original, region)
		}
	}
}
