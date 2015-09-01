/// <reference path="../Error/Region" />
/// <reference path="Source" />
/// <reference path="Token" />
/// <reference path="Substance" />

module Magic.Tokens {
	export class Identifier extends Substance {
		constructor(private name: string, region: Error.Region) {
			super(region)
		}
		getName(): string {
			return this.name
		}
		isIdentifier(name: string = null): boolean {
			return !name || name == this.name
		}
		toString() {
			return this.getName()
		}
		static scan(source: Source): Token {
			var result: string = ""
			if (Identifier.isValidFirstCharacter(source.peek())) {
				do {
					result += source.read()
				} while (Identifier.isValidWithinCharacter(source.peek()))
			}
			return result ? new Identifier(result, source.mark()) : null
		}
		private static isValidFirstCharacter(character: string): boolean {
			return character >= "A" && character <= "Z" || character >= "a" && character <= "z" || character == "_"
		}
		private static isValidWithinCharacter(character: string): boolean {
			return Identifier.isValidFirstCharacter(character) || character >= "0" && character <= "9"
		}
	}
}
