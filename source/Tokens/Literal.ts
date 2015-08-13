/// <reference path="../IO/Location" />
/// <reference path="Token" />

module Magic.Tokens {
	export class Literal extends Token {
		constructor(region: IO.Region, value: string) {
			super(region, value)
		}
	}
}
