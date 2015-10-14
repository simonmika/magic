/// <reference path="Expression" />
/// <reference path="Name" />
/// <reference path="../../Utilities/Iterator" />
/// <reference path="../../Utilities/ArrayIterator" />
/// <reference path="../../Tokens/Identifier" />



module Magic.SyntaxTree.Type {
	export class Identifier extends Name {
		constructor(name: string, private typeParameters: Identifier[], tokens: Tokens.Substance[]) {
			super(name, tokens)
		}
		getTypeParameters(): Utilities.Iterator<Identifier> {
			return new Utilities.ArrayIterator(this.typeParameters)
		}
		static parse(source: Source): Identifier {
			var result: Identifier
			if (source.peek().isIdentifier()) {
				var name = (<Tokens.Identifier>source.next()).getName()
				var typeParameters: Identifier[] = []
				if (source.peek().isOperator("<")) {
					do {
						source.next() // consume "<" or ","
						if (!source.peek().isIdentifier())
							source.raise("Expected type parameter")
						typeParameters.push(Identifier.parse(source.clone()))
					} while (source.peek().isSeparator(","))
					source.next() // consume ">"
				}
				result = new Identifier(name, typeParameters, source.mark())
			}
			return result
		}
	}
	Expression.addParser(Identifier.parse)
}
