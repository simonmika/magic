/// <reference path="../Utilities/Iterator" />
/// <reference path="../Utilities/ArrayIterator" />
/// <reference path="../Tokens/Substance" />

module Magic.SyntaxTree {
	export class Node  {
		constructor(private tokens: Tokens.Substance[]) {
		}
		getTokens(): Utilities.Iterator<Tokens.Substance> {
			return new Utilities.ArrayIterator(this.tokens)
		}
	}
}
