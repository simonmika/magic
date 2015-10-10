/// <reference path="../Error/Region" />
/// <reference path="Source" />
/// <reference path="Token" />
/// <reference path="Substance" />

module Magic.Tokens {
	export class EndOfFile extends Substance {
		constructor(region: Error.Region) {
			super(region)
		}
		static scan(source: Source): Token {
			var result: Token
			switch (source.peek()) {
				case "\0":
					source.read()
					result = new EndOfFile(source.mark())
					break
				default:
					result = null
			}
			return result
		}
	}
}
