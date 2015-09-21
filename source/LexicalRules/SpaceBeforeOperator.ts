/// <reference path="../Error/Handler" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/Substance" />
/// <reference path="../Tokens/Gap" />
/// <reference path="Rule" />

module Magic.LexicalRules {
	export class SpaceBeforeOperator extends Rule {
		constructor() {
			super("Space Before Operator", "Missing space before operator")
		}
		verify(current: Tokens.Substance): boolean {
			return !current.isOperator() || current.getPregap()[0].isWhitespace(" ")
		}
	}
	Rule.add(new SpaceBeforeOperator())
}
