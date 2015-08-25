/// <reference path="../Error/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />
/// <reference path="Substance" />

module Magic.Tokens {
	export class Operator extends Substance {
		constructor(private symbol: string, region: Error.Region) {
			super(symbol, region)
		}
		getSymbol(): string {
			return this.symbol
		}
		isOperator(symbol: string = null): boolean {
			return !symbol && symbol == this.symbol
		}
		static scan(reader: IO.BufferedReader): Token {
			var result: Token;
			switch (reader.peek()) {
				case "@": result = new Operator(reader.read(), reader.mark()); break
				case "+":
					switch (reader.peek(2)) {
						default: result = new Operator(reader.read(), reader.mark()); break
						case "+=": result = new Operator(reader.read(2), reader.mark()); break
					} break
				case "-":
					switch (reader.peek(2)) {
						default: result = new Operator(reader.read(), reader.mark()); break
						case "-=": result = new Operator(reader.read(2), reader.mark()); break
						case "->": result = new Operator(reader.read(2), reader.mark()); break
					} break
				case "*":
					switch (reader.peek(2)) {
						default: result = new Operator(reader.read(), reader.mark()); break
						case "**":
							switch (reader.peek(3)) {
								default: result = new Operator(reader.read(2), reader.mark()); break
								case "**=": result = new Operator(reader.read(3), reader.mark()); break
							} break
						case "*=": result = new Operator(reader.read(2), reader.mark()); break
					} break
				case "/":
					switch (reader.peek(2)) {
						default:
							result = new Operator(reader.read(), reader.mark()); break
						case "/=":
							result = new Operator(reader.read(2), reader.mark()); break
					}; break
				case "=":
					switch (reader.peek(2)) {
						default: result = new Operator(reader.read(), reader.mark()); break
						case "==": result = new Operator(reader.read(2), reader.mark()); break
						case "=>": result = new Operator(reader.read(2), reader.mark()); break
					} break
				case "^":
					switch (reader.peek(2)) {
						default: result = new Operator(reader.read(), reader.mark()); break
						case "^=":result = new Operator(reader.read(2), reader.mark()); break
					} break
				case "|":
					switch (reader.peek(2)) {
						default: result = new Operator(reader.read(), reader.mark()); break
						case "||": result = new Operator(reader.read(2), reader.mark()); break
						case "|=": result = new Operator(reader.read(2), reader.mark()); break
					} break
				case "&":
					switch (reader.peek(2)) {
						default: result = new Operator(reader.read(), reader.mark()) ;break
						case "&&": result = new Operator(reader.read(2), reader.mark()); break
						case "&=": result = new Operator(reader.read(2), reader.mark()); break
					} break
				case "!":
					switch (reader.peek(2)) {
						default: result = new Operator(reader.read(), reader.mark()); break
						case "!=": result = new Operator(reader.read(2), reader.mark()); break
					} break
				case "<":
					switch (reader.peek(2)) {
						default: result = new Operator(reader.read(), reader.mark()); break
						case "<<":
							switch (reader.peek(3)) {
								default: result = new Operator(reader.read(2), reader.mark()); break
								case "<<=": result = new Operator(reader.read(3), reader.mark()); break
							} break
						case "<=":
							switch (reader.peek(4)) {
								default: result = new Operator(reader.read(2), reader.mark()); break
								case "<==>": result = new Operator(reader.read(4), reader.mark()); break
							} break
					} break
				case ">":
					switch (reader.peek(2)) {
						default: result = new Operator(reader.read(), reader.mark()); break
						case ">>":
							switch (reader.peek(3)) {
								default: result = new Operator(reader.read(2), reader.mark()); break
								case ">>=": result = new Operator(reader.read(3), reader.mark()); break
							} break
						case ">=": result = new Operator(reader.read(2), reader.mark()); break
					}
					break
				case ":":
					switch (reader.peek(2)) {
						default: result = null /* separator */; break
						case ":=": result = new Operator(reader.read(2), reader.mark()); break
						case "::":
							switch (reader.peek(3)) {
								default: result = null /* undefined */; break
								case "::=": result = new Operator(reader.read(3), reader.mark()); break
							} break
					} break
				case ".":
					switch (reader.peek(2)) {
						default: result = null /* separator */; break
						case "..": result = new Operator(reader.read(2), reader.mark()); break
					} break
				case "%":
					switch (reader.peek(2)) {
						default: result = new Operator(reader.read(), reader.mark()); break
						case "%=": result = new Operator(reader.read(2), reader.mark()); break
					} break
				case "~": result = new Operator(reader.read(), reader.mark()); break
				case "?": result = new Operator(reader.read(), reader.mark()); break
				default: result = null; break
			}
			return result
		}
	}
}