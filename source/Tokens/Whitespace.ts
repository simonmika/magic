/// <reference path="../IO/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />

module Magic.Tokens {
	export class Whitespace extends Token {
		constructor(region: IO.Region, value: string) {
			super(region, value)
		}
		static scan(reader: IO.BufferedReader): Token {
			var result: Token;
			switch (reader.peek()) {
				case "\r":
				case "\n":
				case "\t":
				case " ":
					result = new Whitespace(reader.mark(), reader.read())
					break
				default:
					result = null
			}
			return result
		}
	}
}
