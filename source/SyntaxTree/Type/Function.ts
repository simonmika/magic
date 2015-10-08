/// <reference path="Expression" />

module Magic.SyntaxTree.Type {
	export class Function extends Expression {
		constructor(private argument: Expression[], private result: Expression, tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getArgument(): Expression[] {
			return this.argument
		}
		getResult(): Expression {
			return this.result
		}
	}
}
