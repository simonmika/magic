/// <reference path="Source" />
/// <reference path="Node" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/EndOfFile" />

module Magic.SyntaxTree {
	export abstract class Statement extends Node {
		constructor(tokens: Tokens.Substance[]) {
			super(tokens)
		}
		private static statementParsers: { parse: ((source: Source) => Statement), priority: number }[] = []
		static addParser(parser: (source: Source) => Statement, priority: number = 0) {
			Statement.statementParsers.push({
				parse: parser,
				priority: priority
			});
			Statement.statementParsers.sort((left, right) => left.priority < right.priority ? -1 : left.priority > right.priority ? 1 : 0);
		}
		static parse(source: Source): Statement {
			var result: Statement
			if (Statement.statementParsers.length > 0) {
				var i = 0
				do {
					result = Statement.statementParsers[i++].parse(source)
				} while (!result && i < Statement.statementParsers.length)
			}
			return result
		}
	}
}
