/// <reference path="../Error/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />
/// <reference path="Substance" />

module Magic.Tokens {
	export class Identifier extends Substance {
		constructor(private name: string, region: Error.Region) {
			super(name, region)
		}
		getName(): string {
			return this.name
		}
		isIdentifier(name: string = null): boolean {
			return !name || name == this.name
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
