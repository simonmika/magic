/// <reference path="../Source" />
/// <reference path="../../Tokens/Substance" />

module Magic.SyntaxTree.Type {
	export class Expression {
		constructor(private tokens: Tokens.Substance[]) {
		}
		getTokens(): Tokens.Substance[] {
			return this.tokens
		}
		private static typeParsers: ((source: Source) => Expression)[] = []
		static addParser(parser: (source: Source) => Expression) {
			Expression.typeParsers.push(parser)
		}
		static parse(source: Source): Expression {
			var result: Expression
			var i = 0
			do
				result = Expression.typeParsers[i++](source)
			while (!result && i < Expression.typeParsers.length);
			return result
		}
	}
}
