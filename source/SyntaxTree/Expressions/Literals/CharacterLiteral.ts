/// <reference path="../../../Tokens/Substance" />
/// <reference path="../../../Tokens/Literals/Char" />
/// <reference path="../../Source" />
/// <reference path="../Expression" />

module Magic.SyntaxTree.Expressions.Literals {
	export class CharacterLiteral extends Expression {
		constructor(private value: string, tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getValue(): string { return this.value }
		static parse(source: Source): CharacterLiteral {
			var result: CharacterLiteral
			if (source.peek() instanceof Tokens.Literals.Char)
				result = new CharacterLiteral((<Tokens.Literals.Char>source.next()).getValue(), source.mark())
			return result
		}
	}
	Expression.addParser(CharacterLiteral.parse)
}
