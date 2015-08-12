module Magic.Frontend {
	export class TokenReader {
		private tokens: Token[];
		private index = 0;
		constructor(lexer: Lexer) {
			this.tokens = lexer.getTokenList();
		}
		get hasNext() { return this.index < this.tokens.length; }
		getNext() {
			var result: Token = null;
			if (this.hasNext) {
				result = this.tokens[this.index++];
			} else {
				result = this.tokens[this.tokens.length - 1];
			}
			return result;
		}
	}
}
