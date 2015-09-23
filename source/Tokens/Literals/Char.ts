/// <reference path="../../Error/Region" />
/// <reference path="../Source" />
/// <reference path="../Token" />
/// <reference path="../Literal" />

module Magic.Tokens.Literals {
	export class Char extends Literal {
		constructor(private value: string, region: Error.Region) {
			super(region)
		}
		getValue(): string { return this.value }
		static scan(source: Source): Token {
			var result: string
			if (source.peek() == "'") {
				source.read()
				result = ""
				// Should we loop on this, that is, should we let the 
				// parser handle multi-character char literals?
				while (source.peek() != "'") {
					if (source.peek() == "\\") {
						switch (source.peek(2)) {
							case "\\0":	result += "\0"; break
							case "\\\\": result += "\\"; break
							case "\\\"": result += "\""; break
							case "\\n":	result += "\n"; break
							case "\\r":	result += "\r"; break
							default: source.raise("Unrecognized escape sequence: \"" + source.peek(2) + "\""); break
						}
						source.read(2)
					} else
						result += source.read()
				}
				source.read() // Consume last '
			}
			return result || result == "" ? new Char(result, source.mark()) : null
		}
	}
}
