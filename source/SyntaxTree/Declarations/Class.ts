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
	export class Class extends Declaration {
		constructor(private name: Type.Name, private typeParameters: Type.Name[], private extended: Type.Identifier, private implemented: Type.Identifier[], private statements: Statement[]) {
			super(name.getName())
		}
		isAbstract(): boolean {
			throw "isAbstract() Not implemented yet."
		}
		getTypeParameters(): Type.Name[] {
			return this.typeParameters
		}
		getExtended(): Type.Identifier {
			return this.extended
		}
		getImplemented(): Type.Identifier[] {
			return this.implemented
		}
		static parse(source: Source): Class {
			var result: Class
			//
			// TODO: Handle 'abstract'
			//
			if (source.peek(0).isIdentifier() && source.peek(1).isSeparator(":") && source.peek(2).isIdentifier("class")) {
				var name = Type.Name.parse(source.clone())
				source.next() // consume ":"
				source.next() // consume "class"
				var typeParameters: Type.Name[] = []
				if (source.peek().isOperator("<")) {
					do {
						source.next() // consume "<" or ","
						if (!source.peek().isIdentifier())
							source.raise("Expected type parameter")
						typeParameters.push(Type.Name.parse(source.clone()))
					} while (source.peek().isSeparator(","))
					source.next() // consume ">"
				}
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
				if (!source.peek().isSeparator("{"))
					source.raise("Expected \"{\"")
				source.next() // consume "{"
				var statements = Statement.parseAll(source)
				result = new Class(name, typeParameters, extended, implemented, statements)
			}
			return result
		}
	}
	Statement.addParser(Class.parse)
}