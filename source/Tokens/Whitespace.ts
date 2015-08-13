/// <reference path="../IO/Region" />

module Magic.Tokens {
	export class Whitespace extends Token {
		constructor(region: IO.Region, value: string) {
			super(region, value)
		}
	}
}
