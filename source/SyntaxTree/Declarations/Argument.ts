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
				var symbol = (<Tokens.Identifier>source.next()).getName()
				var type = Type.Expression.parse(source)
				result = new Argument(symbol, type, source.mark())
			}
			return result
		}
		static parseAll(source: Source): Argument[] {
			var result: Argument[] = []
			if (source.peek().isSeparator("(")) {
				do {
					// TODO: We need to look at the separator to see if it's a ':' or ','
					// ':' means that a type name must follow, ',' means that the next argument identifier must follow
					source.next() // consume: ( or ,
					result.push(Argument.parse(source.clone()))
				} while (source.peek().isSeparator(","))
				if (!source.next().isSeparator(")"))
					source.raise("Expected \",\" or \")\"")
			}
			return result
		}
	}
	//Statement.addParser(Argument.parse)
}
