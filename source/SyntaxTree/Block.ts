/// <reference path="Source" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/EndOfFile" />
/// <reference path="Statement" />
/// <reference path="../Utilities/Iterator" />
/// <reference path="../Utilities/ArrayIterator" />

module Magic.SyntaxTree {
	export class Block extends Statement {
		constructor(private statements: Statement[], tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getStatements(): Utilities.Iterator<Statement> {
			return new Utilities.ArrayIterator(this.statements)
		}
		static parse(source: Source): Block {
			var result: Block
			if (source.peek().isSeparator("{")) {
				source.next() // consume: {
				var statements: Statement[] = []
				var next: Statement
				while (source.peek() &&	!source.peek().isSeparator("}") && (next = Statement.parse(source.clone()))) {
					statements.push(next)
				}
				if (!source.next().isSeparator("}"))
					source.raise("Expected \"}\"")
				result = new Block(statements, source.mark())
			}
			return result
		}
	}
	Statement.addParser(Block.parse)
}
