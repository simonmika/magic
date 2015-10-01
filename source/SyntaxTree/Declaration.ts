/// <reference path="../Utilities/Iterator" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/EndOfFile" />

module Magic.SyntaxTree {
	export class Declaration {
		constructor(private symbol: string) {
		}
		getSymbol(): string { return this.symbol }
	}
}
