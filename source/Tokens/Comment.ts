/// <reference path="../Error/Region" />
/// <reference path="Source" />
/// <reference path="Token" />
/// <reference path="Gap" />

module Magic.Tokens {
	export class Comment extends Gap {
		constructor(private content: string, region: Error.Region) {
			super(region)
		}
		static scan(source: Source): Token {
			var result: string;
			switch (source.peek(2)) {
				case "//":
					result = ""
					source.read(2)
					while (source.peek() != "\n")
						result += source.read()
					break
				case "/*":
					result = ""
					source.read(2)
					while (source.peek(2) != "*/")
						result += source.read()
					break
				default:
					result = null
			}
			return result ? new Comment(result, source.mark()) : null
		}
	}
}
