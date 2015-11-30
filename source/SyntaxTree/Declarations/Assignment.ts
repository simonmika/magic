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
	// ID: TYPE = EXPRESSION
	// Example:
	//	list: List<T> = List<T> new()
	//		list 			= Type.Name
	//		List<T> 		= Type.Identifier
	//		List<T> new()	= Expressions.Expression
	//
	export class Assignment extends Declaration {
		constructor(private left: Type.Name, private right: Expressions.Expression, private type: Type.Identifier, tokens: Tokens.Substance[]) {
			super(left.getName(), tokens)
		}
		getLeft(): Type.Name {
			return this.left
		}
		getRight(): Expressions.Expression {
			return this.right
		}
		getType(): Type.Identifier {
			return this.type
		}
		static parse(source: Source): Assignment {
			var result: Assignment
			var shorthand = false;
			if ((shorthand = Assignment.isDeclareAssignShorthand(source)) || Assignment.isDeclareAssign(source)) {
				var type: Type.Identifier = undefined
				var left = Type.Name.parse(source.clone())
				source.next() // consume ":=" or ":"
				if (!shorthand) {
					type = Type.Identifier.parse(source.clone())
					source.next() // consume "="
				}
				var right = Expressions.Expression.parse(source.clone())
				result = new Assignment(left, right, type, source.mark())
			}
			return result
		}
		// True if ID := EXPRESSION
		private static isDeclareAssignShorthand(source: Source): boolean {
			return source.peek().isIdentifier() && source.peek(1).isOperator(":=")
		}
		// True if ID: TYPE = EXPRESSION
		private static isDeclareAssign(source: Source): boolean {
			return source.peek().isIdentifier() && source.peek(1).isSeparator(":") && source.peek(2).isIdentifier() && source.peek(3).isOperator("=")
		}
	}
	Statement.addParser(Assignment.parse)
}
