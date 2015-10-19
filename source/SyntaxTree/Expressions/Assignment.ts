/// <reference path="../../Tokens/Substance" />
/// <reference path="Expression" />
/// <reference path="../Source" />
/// <reference path="../Type/Name" />
/// <reference path="Literal" />

module Magic.SyntaxTree.Expressions {
	export class Assignment extends Expression {
		constructor(private left: Type.Name, private right: Expression, tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getLeft(): Type.Name {
			return this.left
		}
		getRight(): Expression {
			return this.right
		}
		static parse(source: Source): Assignment {
			var result: Assignment
			if (source.peek().isIdentifier() && source.peek(1).isOperator("=")) {
				var left = Type.Name.parse(source.clone())
				source.next() // consume "="
				var right = Expression.parse(source.clone())
				result = new Assignment(left, right, source.mark())
			}
			return result
		}
	}
	Expression.addParser(Assignment.parse)
}
