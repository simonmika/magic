/// <reference path="Expression" />

module Magic.SyntaxTree.Type {
	export class Function extends Expression {
		constructor(private argumentList: Expression[], private result: Expression, tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getArguments(): Expression[] {
			return this.argumentList
		}
		getResult(): Expression {
			return this.result
		}
	}
}
