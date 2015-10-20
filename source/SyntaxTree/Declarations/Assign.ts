/// <reference path="../Source" />
/// <reference path="../../Tokens/Token" />
/// <reference path="../../Tokens/Identifier" />
/// <reference path="../../Tokens/Separator" />
/// <reference path="../../Tokens/Substance" />
/// <reference path="../Statement" />
/// <reference path="../Declaration" />
/// <reference path="../Type/Identifier" />
/// <reference path="../Type/Name" />

module Magic.SyntaxTree.Declarations {
	//
	// Declare-assign
	// ID := EXPRESSION
	//
	export class Assign extends Declaration {
		constructor(symbol: Type.Name , tokens: Tokens.Substance[]) {
			super(symbol.getName(), tokens)
		}
		static parse(source: Source): Assign {
			var result: Assign
			if (source.peek().isIdentifier() && source.peek(1).isOperator(":=")) {
				var name = Type.Name.parse(source.clone())
				source.next() // consume ":="
				// TODO: Right expression
			}
			return result
		}
	}
}
