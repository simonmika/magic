/// <reference path="../Error/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />
/// <reference path="Gap" />

module Magic.Tokens {
	export class Comment extends Gap {
		constructor(original: string, region: Error.Region) {
			super(original, region)
		}
		static scan(reader: IO.BufferedReader): Token {
			var result: string;
			switch (reader.peek(2)) {
				case "//":
					result = reader.read(2)
					while (reader.peek() != "\n")
						result += reader.read()
					break
				case "/*":
					result = reader.read(2)
					while (reader.peek(2) != "*/")
						result += reader.read()
					break
				default:
					result = null
			}
			return result ? new Comment(result, reader.mark()) : null
		}
	}
}
