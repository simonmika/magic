/// <reference path="../../IO/Region" />
/// <reference path="../../IO/BufferedReader" />
/// <reference path="../Token" />
/// <reference path="../Literal" />

module Magic.Tokens.Literals {
	export class String extends Literal {
		constructor(private value: string, original: string, region: IO.Region) {
			super(region, value)
		}
		getValue() : string { return this.value }
		static scan(reader: IO.BufferedReader): Token {
			var original: string;
			var value: string;
			if (reader.peek() == "\"") {
				original += reader.read()
				do {
					if (reader.peek() == "\"") {
						switch (reader.peek(2)) {
							case "\\0":
								value += "\0"
								break
							case "\\\\":
								value += "\\"
								break
							case "\\\"":
								value += "\""
								break
							case "\\n":
								value += "\n"
								break
							case "\\r":
								value += "\r"
								break
							default:
								throw "Lexer Error: Unrecognized escape sequence: " + reader.peek(2) + " @ " + reader.getLocation()
								break
						}
						original += reader.read(2)
					}
					else {
						var c = reader.read()
						original += c
						value += c
					}
				} while (reader.peek() != "\"")
				original += reader.read()
			}
			return original ? new String(value, original, reader.mark()) : null
		}
	}
}
