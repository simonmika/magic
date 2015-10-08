/// <reference path="Source" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/EndOfFile" />

module Magic.SyntaxTree {
	export class Statement {
		constructor() {
		}
		private static statementParsers = <((source: Source) => Statement)[]> new Array()
		static addParser(parser: (source: Source) => Statement) {
			Statement.statementParsers.push(parser)
		}
		static parse(source: Source): Statement {
			var result: Statement
			var i = 0
			do
				result = Statement.statementParsers[i++](source)
			while (!result && i < Statement.statementParsers.length);
			return result
		}
		static parseAll(source: Source): Statement[] {
			var result: Statement[] = []
			var next: Statement
			while (source.peek() &&	!(source.peek().isSeparator("}")) && (next = Statement.parse(source.clone())))
				result.push(next)
			return result
		}
	}
}
