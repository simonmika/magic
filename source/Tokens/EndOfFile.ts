/// <reference path="../Error/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />
/// <reference path="Substance" />

module Magic.Tokens {
	export class EndOfFile extends Substance {
		constructor(original: string, region: Error.Region) {
			super(original, region)
		}
		static scan(reader: IO.BufferedReader): Token {
			var result: Token;
			switch (reader.peek()) {
				case "\0":
					result = new EndOfFile(reader.read(), reader.mark())
					break
				default:
					result = null
			}
			return result
		}
	}
}
