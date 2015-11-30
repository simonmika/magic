/// <reference path="../../Tokens/Substance" />
/// <reference path="../Statement" />
/// <reference path="../Source" />

module Magic.SyntaxTree.Expressions {
	export abstract class Expression extends Statement {
		constructor(tokens: Tokens.Substance[]) {
			super(tokens)
		}
		private static expressionParsers: { parse: ((source: Source) => Expression), priority: number }[] = [];
		static addParser(parser: (source: Source) => Expression, priority: number = 0) {
			Expression.expressionParsers.push({
				parse: parser,
				priority: priority
			})
			Expression.expressionParsers.sort((left, right) => left.priority < right.priority ? -1 : left.priority > right.priority ? 1 : 0);
		}
		static parse(source: Source): Expression {
			var result: Expression
			if (Expression.expressionParsers.length > 0) {
				var i = 0
				do
					result = Expression.expressionParsers[i++].parse(source.clone())
				while (!result && i < Expression.expressionParsers.length);
			}
			return result
		}
	}
	Statement.addParser(Expression.parse, 10)
}
