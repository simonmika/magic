/// <reference path="../Error/Region" />
/// <reference path="Source" />
/// <reference path="Token" />
/// <reference path="Gap" />

module Magic.Tokens {
	export class Whitespace extends Gap {
		constructor(private endsLine: boolean, region: Error.Region) {
			super(region)
		}
		getEndsLine(): boolean { return this.endsLine }
		static scan(source: Source): Token {
			var result: Token = null
			if (Whitespace.isWhitespace(source.peek())) {
				source.mark()
				do {
					switch (source.peek()) {
						case "\n":
							source.mark()
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
							break
					}
				} while (false)
			}

			return result
		}
		private static isWhitespace(character: string) {
			return character === "\n" || character === "\r" || character === "\t" || character === " "
		}
	}
}
