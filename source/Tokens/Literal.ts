/// <reference path="../IO/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />

module Magic.Tokens {
	export class Literal extends Token {
		constructor(region: IO.Region, original: string) {
			super(original, region)
		}
	}
}
