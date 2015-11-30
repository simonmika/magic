/// <reference path="../Source" />
/// <reference path="../../Tokens/Token" />
/// <reference path="../../Tokens/Identifier" />
/// <reference path="../../Tokens/Separator" />
/// <reference path="../../Tokens/Substance" />
/// <reference path="../Statement" />
/// <reference path="../Declaration" />
/// <reference path="../Type/Identifier" />
/// <reference path="../Type/Name" />
/// <reference path="../Expressions/Expression" />

module Magic.SyntaxTree.Declarations {
	//
	// Declare-assign
	// ID := EXPRESSION
	//
	export class Assignment extends Declaration {
		constructor(private left: Type.Name, private right: Expressions.Expression, tokens: Tokens.Substance[]) {
			super(left.getName(), tokens)
		}
		getLeft(): Type.Name {
			return this.left
		}
		getRight(): Expressions.Expression {
			return this.right
		}
		static parse(source: Source): Assignment {
			var result: Assignment
			if (source.peek().isIdentifier() && source.peek(1).isOperator(":=")) {
				var left = Type.Name.parse(source.clone())
				source.next() // consume ":="
				var right = Expressions.Expression.parse(source.clone())
				result = new Assignment(left, right, source.mark())
			}
			return result
		}
	}
	Statement.addParser(Assignment.parse)
}
