/// <reference path="../Source" />
/// <reference path="../../Tokens/Token" />
/// <reference path="../../Tokens/Identifier" />
/// <reference path="../../Tokens/Separator" />
/// <reference path="../../Tokens/Substance" />
/// <reference path="../Statement" />
/// <reference path="../Declaration" />
/// <reference path="../Type/Identifier" />
/// <reference path="../Type/Name" />
/// <reference path="../Block" />


module Magic.SyntaxTree.Declarations {
	export class Class extends Declaration {
		constructor(symbol: Type.Name, private typeParameters: Type.Name[], private extended: Type.Identifier, private implemented: Type.Identifier[], private block: Block, tokens: Tokens.Substance[]) {
			super(symbol.getName(), tokens)
		}
		isAbstract(): boolean {
			throw "isAbstract() Not implemented yet."
		}
		getTypeParameters(): Utilities.Iterator<Type.Name> {
			return new Utilities.ArrayIterator(this.typeParameters)
		}
		getExtended(): Type.Identifier {
			return this.extended
		}
		getImplemented(): Utilities.Iterator<Type.Identifier> {
			return new Utilities.ArrayIterator(this.implemented)
		}
		getBlock(): Block {
			return this.block
		}
		static parse(source: Source): Class {
			var result: Class
			//
			// TODO: Handle 'abstract'
			//
			if (source.peek(0).isIdentifier() && source.peek(1).isSeparator(":") && source.peek(2).isIdentifier("class")) {
				var symbol = Type.Name.parse(source.clone())
				source.next() // consume ":"
				source.next() // consume "class"
				var typeParameters = Declaration.parseTypeParameters(source)
				var extended: Type.Identifier
				if (source.peek().isIdentifier("extends")) {
					source.next() // consume "extends"
					if (!source.peek().isIdentifier())
						source.raise("Expected identifier with name of class to extend.")
					extended = Type.Identifier.parse(source.clone())
				}
				var implemented: Type.Identifier[] = []
				if (source.peek().isIdentifier("implements"))
					do {
						source.next() // consume "implements" or ","
						if (!source.peek().isIdentifier())
							source.raise("Expected identifier with name of interface to extend.")
						implemented.push(Type.Identifier.parse(source.clone()))
					} while (source.peek().isSeparator(","))
				var block = Block.parse(source)
				result = new Class(symbol, typeParameters, extended, implemented, block, source.mark())
			}
			return result
		}
	}
	Statement.addParser(Class.parse)
}