/// <reference path="../../../Tokens/Substance" />
/// <reference path="../../../Tokens/Literals/Number" />
/// <reference path="../../Source" />
/// <reference path="../Expression" />

module Magic.SyntaxTree.Expressions.Literals {
	export class NumberLiteral extends Expression {
		constructor(private value: number, tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getValue(): number { return this.value }
		static parse(source: Source): NumberLiteral {
			var result: NumberLiteral
			if (source.peek() instanceof Tokens.Literals.Number)
				result = new NumberLiteral((<Tokens.Literals.Number>source.next()).getValue(), source.mark())
			return result
		}
	}
	Expression.addParser(NumberLiteral.parse)
}
