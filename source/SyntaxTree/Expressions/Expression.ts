/// <reference path="../../Tokens/Substance" />
/// <reference path="../Statement" />
/// <reference path="../Source" />

module Magic.SyntaxTree.Expressions {
	export class Expression extends Statement {
		constructor(tokens: Tokens.Substance[]) {
			super(tokens)
		}
		private static parsers: ((source: Source) => Expression)[] = [];
		static addParser(parser: (source: Source) => Expression) {
			Expression.parsers.push(parser)
		}
		static parse(source: Source): Expression {
			var result: Expression
			if (Expression.parsers.length > 0) {
				var i = 0
				do
					result = Expression.parsers[i++](source.clone())
				while (!result && i < Expression.parsers.length);
			}
			return result
		}
	}
	Statement.addParser(Expression.parse)
}
