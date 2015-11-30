/// <reference path="Expression" />
/// <reference path="../../Tokens/Identifier" />

module Magic.SyntaxTree.Type {
	export class Name extends Expression {
		constructor(private name: string, tokens: Tokens.Substance[]) {
			super(tokens)
		}
		getName(): string {
			return this.name
		}
		static parse(source: Source): Name {
			return source.peek().isIdentifier() ? new Name((<Tokens.Identifier>source.next()).getName(), source.mark()) : null
		}
	}
}
