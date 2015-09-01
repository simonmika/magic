/// <reference path="../Error/Region" />
/// <reference path="Source" />
/// <reference path="Token" />
/// <reference path="Substance" />

module Magic.Tokens {
	export class Separator extends Substance {
		constructor(private symbol: string, region: Error.Region) {
			super(region)
		}
		getSymbol(): string {
			return this.symbol
		}
		isSeparator(symbol: string = null): boolean {
			return !symbol || this.symbol == symbol
		}
		toString() {
			return this.getSymbol()
		}
		static scan(source: Source): Token {
			var result: Token;
			switch (source.peek()) {
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
					result = new Separator(source.read(), source.mark())
					break
				default:
					result = null
			}
			return result
		}
	}
}
