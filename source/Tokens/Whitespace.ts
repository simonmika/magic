/// <reference path="../Error/Region" />
/// <reference path="Source" />
/// <reference path="Token" />
/// <reference path="Gap" />

module Magic.Tokens {
	export class Whitespace extends Gap {
		constructor(private endsLine: boolean, region: Error.Region) {
			super(region)
		}
		getEndsLine() : boolean { return this.endsLine }
		static scan(source: Source): Token {
			var result: Token
			do {
				switch (source.peek()) {
					case "\n":
						source.read()
						result = new Whitespace(true, source.mark())
						break
					case "\r":
					case "\t":
					case " ":
						source.read()
						continue
					default:
						result = new Whitespace(false, source.mark())
				}
			} while (false)
			return result
		}
	}
}
