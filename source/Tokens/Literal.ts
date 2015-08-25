/// <reference path="../Error/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />
/// <reference path="Substance" />

module Magic.Tokens {
	export class Literal extends Substance {
		constructor(original: string, region: Error.Region) {
			super(original, region)
		}
	}
}
