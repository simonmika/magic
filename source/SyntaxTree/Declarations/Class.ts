/// <reference path="../Source" />
/// <reference path="../../Tokens/Token" />
/// <reference path="../../Tokens/Identifier" />
/// <reference path="../../Tokens/Separator" />
/// <reference path="../../Tokens/Substance" />
/// <reference path="../Statement" />
/// <reference path="../Declaration" />

module Magic.SyntaxTree.Declarations {
	export class Class extends Declaration {
		constructor(private name: Tokens.Identifier, private extended: Tokens.Identifier, private implemented: Tokens.Identifier[], private statements: Statement[]) {
			super(name.getName())
		}
		static parse(source: Source): Class {
			var result: Class
			if (source.peek(0).isIdentifier() && source.peek(1).isSeparator(":") && source.peek(1).isIdentifier("class")) {
				var name = (<Tokens.Identifier>source.next())
				source.next() // consume ":"
				source.next() // consume "class"
				var extended: Tokens.Identifier
				if (source.peek().isIdentifier("extends")) {
					source.next() // consume "extends"
					if (!source.peek().isIdentifier()) {
						source.raise("Expected identifier with name of class to extend.")
					}
					extended = <Tokens.Identifier>source.next()
				}
				var implemented: Tokens.Identifier[] = []
				if (source.peek() instanceof Tokens.Identifier && (<Tokens.Identifier>source.peek()).getName() == "implements") {
					do {
						source.next() // consume "implements" or ","
						if (!source.peek().isIdentifier()) {
							source.raise("Expected identifier with name of interface to extend.")
						}
						implemented.push(<Tokens.Identifier>source.next())
					} while (source.peek().isSeparator(","))
				}
				if (!source.peek().isSeparator("{")) {
					source.raise("Expected \"{\"")
				}
				source.next() // consume "{"
				var statements = Statement.parseAll(source)
				result = new Class(name, extended, implemented, statements)
			}
			return result
		}
	}
	Statement.addParser(Class.parse)
}