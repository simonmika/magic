/// <reference path="../Utilities/Iterator" />
/// <reference path="../Utilities/ArrayIterator" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/EndOfFile" />
/// <reference path="Type/Name" />

module Magic.SyntaxTree {
	export class Declaration {
		constructor(private symbol: string, private tokens: Tokens.Substance[]) {
		}
		getSymbol(): string { return this.symbol }
		getTokens(): Utilities.Iterator<Tokens.Substance> { return new Utilities.ArrayIterator(this.tokens) }
	}
}
