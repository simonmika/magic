/// <reference path="../Error/Region" />
/// <reference path="Source" />
/// <reference path="Token" />
/// <reference path="Substance" />

module Magic.Tokens {
	export class Operator extends Substance {
		constructor(private symbol: string, region: Error.Region) {
			super(region)
		}
		getSymbol(): string {
			return this.symbol
		}
		isOperator(symbol: string = null): boolean {
			return !symbol && symbol == this.symbol
		}
		static scan(source: Source): Token {
			var result: Token;
			switch (source.peek()) {
				case "@": result = new Operator(source.read(), source.mark()); break
				case "+":
					switch (source.peek(2)) {
						default: result = new Operator(source.read(), source.mark()); break
						case "++": result = new Operator(source.read(2), source.mark()); break
						case "+=": result = new Operator(source.read(2), source.mark()); break
					} break
				case "-":
					switch (source.peek(2)) {
						default: result = new Operator(source.read(), source.mark()); break
						case "-=": result = new Operator(source.read(2), source.mark()); break
						case "->": result = new Operator(source.read(2), source.mark()); break
					} break
				case "*":
					switch (source.peek(2)) {
						default: result = new Operator(source.read(), source.mark()); break
						case "**":
							switch (source.peek(3)) {
								default: result = new Operator(source.read(2), source.mark()); break
								case "**=": result = new Operator(source.read(3), source.mark()); break
							} break
						case "*=": result = new Operator(source.read(2), source.mark()); break
					} break
				case "/":
					switch (source.peek(2)) {
						default: result = new Operator(source.read(), source.mark()); break
						case "/=": result = new Operator(source.read(2), source.mark()); break
					}; break
				case "=":
					switch (source.peek(2)) {
						default: result = new Operator(source.read(), source.mark()); break
						case "==": result = new Operator(source.read(2), source.mark()); break
						case "=>": result = new Operator(source.read(2), source.mark()); break
					} break
				case "^":
					switch (source.peek(2)) {
						default: result = new Operator(source.read(), source.mark()); break
						case "^=": result = new Operator(source.read(2), source.mark()); break
					} break
				case "|":
					switch (source.peek(2)) {
						default: result = new Operator(source.read(), source.mark()); break
						case "||": result = new Operator(source.read(2), source.mark()); break
						case "|=": result = new Operator(source.read(2), source.mark()); break
					} break
				case "&":
					switch (source.peek(2)) {
						default: result = new Operator(source.read(), source.mark()); break
						case "&&": result = new Operator(source.read(2), source.mark()); break
						case "&=": result = new Operator(source.read(2), source.mark()); break
					} break
				case "!":
					switch (source.peek(2)) {
						default: result = new Operator(source.read(), source.mark()); break
						case "!=": result = new Operator(source.read(2), source.mark()); break
					} break
				case "<":
					switch (source.peek(2)) {
						default: result = new Operator(source.read(), source.mark()); break
						case "<<":
							switch (source.peek(3)) {
								default: result = new Operator(source.read(2), source.mark()); break
								case "<<=": result = new Operator(source.read(3), source.mark()); break
							} break
						case "<=":
							switch (source.peek(4)) {
								default: result = new Operator(source.read(2), source.mark()); break
								case "<==>": result = new Operator(source.read(4), source.mark()); break
							} break
					} break
				case ">":
					switch (source.peek(2)) {
						default: result = new Operator(source.read(), source.mark()); break
						case ">>":
							switch (source.peek(3)) {
								default: result = new Operator(source.read(2), source.mark()); break
								case ">>=": result = new Operator(source.read(3), source.mark()); break
							} break
						case ">=": result = new Operator(source.read(2), source.mark()); break
					}
					break
				case ":":
					switch (source.peek(2)) {
						default: result = null /* separator */; break
						case ":=":
							switch (source.peek(3)) {
								default: result = new Operator(source.read(2), source.mark()); break
								case ":==": result = new Operator(source.read(3), source.mark()); break
							} break
						case "::":
							switch (source.peek(3)) {
								default: source.raise("Undefined operator \"::\""); break
								case "::=": result = new Operator(source.read(3), source.mark()); break
							} break
					} break
				case ".":
					switch (source.peek(2)) {
						default: result = null /* separator */; break
						case "..": result = new Operator(source.read(2), source.mark()); break
					} break
				case "%":
					switch (source.peek(2)) {
						default: result = new Operator(source.read(), source.mark()); break
						case "%=": result = new Operator(source.read(2), source.mark()); break
					} break
				case "~": result = new Operator(source.read(), source.mark()); break
				case "?": result = new Operator(source.read(), source.mark()); break
				default: result = null; break
			}
			return result
		}
	}
}
