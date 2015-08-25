/// <reference path="../Error/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />
/// <reference path="Gap" />

module Magic.Tokens {
	export class Whitespace extends Gap {
		constructor(private endsLine: boolean, original: string, region: Error.Region) {
			super(original, region)
		}
		getEndsLine() : boolean { return this.endsLine }
		static scan(reader: IO.BufferedReader): Token {
			var result: Token
			var original: string
			do {
				switch (reader.peek()) {
					case "\n":
						result = new Whitespace(true, original + reader.read(), reader.mark())
						break
					case "\r":
					case "\t":
					case " ":
						original += reader.read()
						break
					default:
						result = original ? new Whitespace(false, original, reader.mark()) : null
				}
			} while (original && !result)
			return result
		}
	}
}
