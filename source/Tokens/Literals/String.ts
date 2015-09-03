/// <reference path="../../Error/Region" />
/// <reference path="../Source" />
/// <reference path="../Token" />
/// <reference path="../Literal" />

module Magic.Tokens.Literals {
	export class String extends Literal {
		constructor(private value: string, region: Error.Region) {
			super(region)
		}
		getValue(): string { return this.value }
		static scan(source: Source): Token {
			var result: string
			if (source.peek() == "\"") {
				source.read()
				result = ""
				do {
					if (source.peek() == "\\") {
						switch (source.peek(2)) {
							case "\\0":
								result += "\0"; break
							case "\\\\":
								result += "\\"; break
							case "\\\"":
								result += "\""; break
							case "\\n":
								result += "\n"; break
							case "\\r":
								result += "\r"; break
							default:
								source.raise("Unrecognized escape sequence: \"" + source.peek(2) + "\""); break
						}
						source.read(2)
					}
					else if (source.peek() === "\"") {
						continue
					}
					else {
						result += source.read()
					}
				} while (source.peek() != "\"")
				source.read()
			}
			return result || result === "" ? new String(result, source.mark()) : null
		}
	}
}
