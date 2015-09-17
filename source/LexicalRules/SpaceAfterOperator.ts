/// <reference path="../Error/Handler" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/Substance" />
/// <reference path="../Tokens/Gap" />
/// <reference path="Rule" />
/// <reference path="NextRule" />

module Magic.LexicalRules {
	export class SpaceAfterOperator extends NextRule {
		constructor() {
			super("Space After Operator", "Missing space after operator")
		}
		verifyNext(next: Tokens.Substance, current: Tokens.Substance): boolean {
			return !current.isOperator() || next.getPregap()[0].isWhiteSpace(" ")
		}
	}
	Rule.add(new SpaceAfterOperator())
}
