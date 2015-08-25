/// <reference path="../Error/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />
/// <reference path="Substance" />

module Magic.Tokens {
	export class Separator extends Substance {
		constructor(private symbol: string, region: Error.Region) {
			super(symbol, region)
		}
		getSymbol(): string {
			return this.symbol
		}
		isSeparator(symbol: string = null): boolean {
			return !symbol || this.symbol == symbol
		}
		static scan(reader: IO.BufferedReader): Token {
			var result: Token;
			switch (reader.peek()) {
				case ".":
				case ":":
				case ";":
				case ",":
				case "[":
				case "]":
				case "(":
				case ")":
				case "{":
				case "}":
					result = new Separator(reader.read(), reader.mark())
					break
				default:
					result = null
			}
			return result
		}
	}
}
