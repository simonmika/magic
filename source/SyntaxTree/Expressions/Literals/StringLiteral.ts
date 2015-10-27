/// <reference path="../../../Tokens/Substance" />
/// <reference path="../../../Tokens/Literals/String" />
/// <reference path="../../Source" />
/// <reference path="../Expression" />

module Magic.SyntaxTree.Expressions.Literals {
	export class StringLiteral extends Expression {
		constructor(private value: string, tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getValue(): string { return this.value }
		static parse(source: Source): StringLiteral {
			var result: StringLiteral
			if (source.peek() instanceof Tokens.Literals.String)
				result = new StringLiteral((<Tokens.Literals.String>source.next()).getValue(), source.mark())
			return result
		}
	}
	Expression.addParser(StringLiteral.parse)
}
