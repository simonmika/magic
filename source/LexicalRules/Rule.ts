/// <reference path="../Error/Handler" />
/// <reference path="../Tokens/Substance" />

module Magic.LexicalRules {
	export class Rule {
		constructor(private name: string, private message: string) {
		}
		getName(): string {
			return this.name
		}
		getMessage(): string {
			return this.message
		}
		verify(token: Tokens.Substance): boolean {
			return true
		}
		next(handler: Error.Handler, current: Tokens.Substance) {
			if (!this.verify(current))
				handler.raise(this.getMessage() + " @ " + current)
		}
		private static rules = <Rule[]> new Array()
		static add(rule: Rule) {
			Rule.rules.push(rule)
		}
		static verify(handler: Error.Handler, token: Tokens.Substance) {
			for (var i = 0; i < Rule.rules.length; i++)
				Rule.rules[i].next(handler, token)
		}
	}
}
