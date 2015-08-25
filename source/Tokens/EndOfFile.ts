/// <reference path="../IO/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />
/// <reference path="Substance" />

module Magic.Tokens {
	export class EndOfFile extends Substance {
		constructor(region: IO.Region, original: string) {
			super(original, region)
		}
		static scan(reader: IO.BufferedReader): Token {
			var result: Token;
			switch (reader.peek()) {
				case "\0":
					result = new EndOfFile(reader.mark(), reader.read())
					break
				default:
					result = null
			}
			return result
		}
	}
}
