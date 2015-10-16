/// <reference path="../../Tokens/Substance" />
/// <reference path="../Source" />
/// <reference path="Expression" />

module Magic.SyntaxTree.Expressions {
	export class Literal extends Expression {
		constructor(private literal: Tokens.Substance, tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getLiteral(): Tokens.Substance {
			return this.literal
		}
		static parse(source: Source): Literal {
			var result: Literal
			if (source.peek().isLiteral())
				result = new Literal(source.next(), source.mark())
			return result
		}
	}
	Expression.addParser(Literal.parse)
}
