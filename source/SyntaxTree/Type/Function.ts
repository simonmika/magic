/// <reference path="Expression" />
/// <reference path="../../Utilities/Iterator" />
/// <reference path="../../Utilities/ArrayIterator" />

module Magic.SyntaxTree.Type {
	export class Function extends Expression {
		constructor(private argumentList: Expression[], private result: Expression, tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getArguments(): Utilities.Iterator<Expression> {
			return new Utilities.ArrayIterator(this.argumentList)
		}
		getResult(): Expression {
			return this.result
		}
	}
}
