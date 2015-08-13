/// <reference path="../Utilities/Iterator" />
/// <reference path="../IO/Position" />
/// <reference path="../IO/Location" />
/// <reference path="../IO/Region" />
/// <reference path="../IO/Reader" />
/// <reference path="../IO/BufferedReader" />

module Magic.Tokens {
	export class Lexer implements Utilities.Iterator<Token> {
		private reader: IO.BufferedReader
		constructor(reader: IO.Reader) {
			this.reader = new IO.BufferedReader(reader)
		}
		next(): Utilities.IteratorResult<Token> {
			var result = { done: true }
			while (!this.reader.isEmpty()) {
					switch (this.reader.peek()) {
						case "":
							break
					}
			}
			return result
		}
	}
}
