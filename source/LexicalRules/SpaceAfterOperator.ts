/// <reference path="../Error/Handler" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/Substance" />
/// <reference path="../Tokens/Gap" />
/// <reference path="Rule" />
/// <reference path="NextRule" />

module Magic.LexicalRules {
	export class SpaceAfterOperator extends Rule {
		constructor() {
			super("Space After Operator", "Missing space after operator")
		}
		verify(current: Tokens.Substance): boolean {
			return !current.isOperator() || (current.getPostgap().length > 0 && current.getPostgap()[0].isWhitespace(" "))
		}
	}
	Rule.add(new SpaceAfterOperator())
}
