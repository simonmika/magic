/// <reference path="Source" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/Substance" />
/// <reference path="../Tokens/EndOfFile" />
/// <reference path="Statement" />
/// <reference path="Declarations/Class" />

module Magic.SyntaxTree {
	export class Module {
		private namespace: string[]
		constructor(private statements: Statement[], private last: Tokens.EndOfFile) {
			this.namespace = last.getRegion().getResource().split("/")
		}
		static parse(source: Source): Module {
			var result = Statement.parseAll(source)
			var last = <Tokens.EndOfFile>source.next()
			if (!last) {
				source.raise("Missing end of file.")
			}
			return new Module(result, last)
		}
	}
}