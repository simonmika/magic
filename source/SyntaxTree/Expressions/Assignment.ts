/// <reference path="../../Tokens/Substance" />
/// <reference path="../Source" />
/// <reference path="Expression" />
/// <reference path="Identifier" />

module Magic.SyntaxTree.Expressions {
	export class Assignment extends Expression {
		constructor(private left: Identifier, private right: Expression, tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getLeft(): Identifier {
			return this.left
		}
		getRight(): Expression {
			return this.right
		}
		static parse(source: Source): Assignment {
			var result: Assignment
			if (source.peek().isIdentifier() && source.peek(1).isOperator("=")) {
				var left = Identifier.parse(source.clone())
				source.next() // consume "="
				var right = Expression.parse(source.clone())
				result = new Assignment(left, right, source.mark())
			}
			return result
		}
	}
	Expression.addParser(Assignment.parse)
}
