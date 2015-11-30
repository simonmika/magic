/// <reference path="../../Tokens/Substance" />
/// <reference path="../../Tokens/Identifier" />
/// <reference path="../Source" />
/// <reference path="Expression" />

module Magic.SyntaxTree.Expressions {
	//
	// TODO: Make this abstract
	//	Derived:
	//		NamedIdentifier		: a, abc, foobar
	//		TupleIdentifier		: (a, b, c)
	//		DiscardedIdentifier	: (a, b, _), where '_' is the discarded identifier
	//
	export class Identifier extends Expression {
		constructor(private name: string, tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getName(): string {
			return this.name
		}
		static parse(source: Source): Identifier {
			var result: Identifier
			if (source.peek().isIdentifier() /*&& !source.peek(1).isOperator() && !source.peek(1).isSeparator()*/)
				result = new Identifier((<Tokens.Identifier>source.next()).getName(), source.mark())
			return result
		}
	}
	Expression.addParser(Identifier.parse, 10)
}
