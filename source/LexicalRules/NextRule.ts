/// <reference path="../Error/Handler" />
/// <reference path="../Tokens/Substance" />
/// <reference path="Rule" />

module Magic.LexicalRules {
	export class NextRule extends Rule {
		private last: Tokens.Substance
		constructor(name: string, message: string) {
			super(name, message)
		}
		verifyNext(next: Tokens.Substance, current: Tokens.Substance): boolean {
			return true
		}
		verify(current: Tokens.Substance): boolean {
			if (!this.last)
				this.last = current
			var result = this.verifyNext(current, this.last)
			this.last = current
			return result
		}
	}
}
