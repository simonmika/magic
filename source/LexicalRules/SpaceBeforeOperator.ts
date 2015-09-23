/// <reference path="../Error/Handler" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/Substance" />
/// <reference path="../Tokens/Gap" />
/// <reference path="NextRule" />

module Magic.LexicalRules {
	export class SpaceBeforeOperator extends NextRule {
		constructor() {
			super("Space Before Operator", "Missing space before operator")
		}
		verifyNext(next: Tokens.Substance, current: Tokens.Substance): boolean {
			return !next.isOperator() || current.getPostgap().length > 0 && current.getPostgap()[0].isWhitespace(" ")
		}
	}
	Rule.add(new SpaceBeforeOperator())
}
