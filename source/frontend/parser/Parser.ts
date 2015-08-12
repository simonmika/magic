module Magic.Frontend.Parser {
	export class Parser {
		private tokenReader: Magic.Frontend.TokenReader;
		constructor(file: string, glossary: Glossary) {
			this.tokenReader = new TokenReader(new Lexer(file, glossary));
		}
		parse() {

		}
	}
}
