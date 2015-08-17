/// <reference path="../IO/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />

module Magic.Tokens {
	export class Identifier extends Token {
		constructor(original: string, region: IO.Region) {
			super(original, region)
		}
		static scan(reader: IO.BufferedReader): Token {
			var result: string
			if (Identifier.isValidFirstCharacter(reader.peek())) {
				do {
					result += reader.read()
				} while (Identifier.isValidWithinCharacter(reader.peek()))
			}
			return result ? new Identifier(result, reader.mark()) : null
		}
		private static isValidFirstCharacter(character: string): boolean {
			return character >= "A" && character <= "Z" || character >= "a" && character <= "z" || character == "_"
		}
		private static isValidWithinCharacter(character: string): boolean {
			return Identifier.isValidFirstCharacter(character) || character >= "0" && character <= "9"
		}
	}
}
