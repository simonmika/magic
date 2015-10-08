/// <reference path="Expression" />

module Magic.SyntaxTree.Type {
	export class Tuple extends Expression {
		constructor(private children: Expression[], tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getChildren(): Expression[] {
			return this.children
		}
	}
}
