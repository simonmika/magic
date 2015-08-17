/// <reference path="../IO/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />

module Magic.Tokens {
	export class Comment extends Token {
		constructor(original: string, region: IO.Region) {
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
