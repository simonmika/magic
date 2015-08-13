/// <reference path="../IO/Location" />

module Magic.Tokens {
	export class Identifier extends Token {
		constructor(region: IO.Region, value: string) {
			super(region, value)
		}
	}
}
