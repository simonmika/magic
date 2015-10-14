/// <reference path="../Source" />
/// <reference path="../../Tokens/Token" />
/// <reference path="../../Tokens/Identifier" />
/// <reference path="../../Tokens/Separator" />
/// <reference path="../../Tokens/Substance" />
/// <reference path="../Statement" />
/// <reference path="../Declaration" />
/// <reference path="../Type/Name" />
/// <reference path="../Type/Expression" />

module Magic.SyntaxTree.Declarations {
	export class Argument extends Declaration {
		constructor(symbol: string, private type: Type.Expression, tokens: Tokens.Substance[]) {
			super(symbol, tokens)
		}
		getType(): Type.Expression {
			return this.type
		}
		static parse(source: Source): Argument {
			var result: Argument
			// TODO: add support for syntactical sugar: .argument, =argument, argument := value
			if (source.peek(0).isIdentifier()) {
				var type: Type.Expression
				var symbol = (<Tokens.Identifier>source.next()).getName()
				if (source.peek().isSeparator(":")) {
					source.next() // consume ":"
					type = Type.Expression.parse(source.clone())
				}
				result = new Argument(symbol, type, source.mark())
			}
			return result
		}
		static parseAll(source: Source): Argument[] {
			var result: Argument[] = []
			if (source.peek().isSeparator("(")) {
				do {
					source.next() // consume: ( or ,
					result.push(Argument.parse(source.clone()))
				} while (source.peek().isSeparator(","))
				if (!source.next().isSeparator(")"))
					source.raise("Expected \")\"")
				//
				// Iterate through the argument list and assign a type to arguments whose type are not set explicitly.
				// This is useful for cases where the argument list is written in reduced form.
				// 	Example: foo: func (width, height: Int, x, y, z: Float)
				//
				var previousArgumentType = result[result.length - 1].getType()
				for (var i = result.length - 1; i >= 0; i--) {
					var currentArgumentType = result[i].getType()
					if (currentArgumentType && currentArgumentType !== previousArgumentType)
						previousArgumentType = currentArgumentType
					if (!currentArgumentType)
						result[i].type = previousArgumentType
				}
			}
			return result
		}
	}
}
