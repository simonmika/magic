/// <reference path="../../Error/Region" />
/// <reference path="../Source" />
/// <reference path="../Token" />
/// <reference path="../Literal" />

module Magic.Tokens.Literals {
	export class Number extends Literal {
		constructor(private value: number, original: string, region: Error.Region) {
			super(region)
		}
		getValue(): number { return this.value }
		static scan(source: Source): Token {
			return Number.scanHexadecimal(source)
		}
		private static scanHexadecimal(reader: IO.BufferedReader): Token {
			var result: Token
			if (reader.peek(2) == "0x") {
				var original = reader.read(2)
				var value: number
				var divisor: number
				while (!result) {
					switch (reader.peek()) {
						case ".":
							original += reader.read()
							if (divisor)
								result = new Number(divisor ? value / divisor : value, original, reader.mark())
							else
								divisor = 1
							continue
						case "_": original += reader.read(); continue
						case "0": value += 0; original += reader.read(); break
						case "1": value += 1; original += reader.read(); break
						case "2": value += 2; original += reader.read(); break
						case "3": value += 3; original += reader.read(); break
						case "4": value += 4; original += reader.read(); break
						case "5": value += 5; original += reader.read(); break
						case "6": value += 6; original += reader.read(); break
						case "7": value += 7; original += reader.read(); break
						case "8": value += 8; original += reader.read(); break
						case "9": value += 9; original += reader.read(); break
						case "a": value += 10; original += reader.read(); break
						case "b": value += 11; original += reader.read(); break
						case "c": value += 12; original += reader.read(); break
						case "d": value += 13; original += reader.read(); break
						case "e": value += 14; original += reader.read(); break
						case "f": value += 15; original += reader.read(); break
						default: result = new Number(divisor ? value / divisor : value, original, reader.mark()); continue
					}
					value *= 16
					if (divisor)
						divisor *= 16
				}
			} else {
				result = null
			}
			return result
		}
		private static scanDecimal(reader: IO.BufferedReader): Token {
			var result: Token
			var c = reader.peek()
			if (Number.isNumber(c) || c == "." && Number.isNumber(reader.peek(2).slice(1, 2))) {
				var original: string
				var value: number
				var divisor: number
				while (!result) {
					switch (reader.peek()) {
						case ".":
							original += reader.read()
							if (divisor)
								result = new Number(divisor ? value / divisor : value, original, reader.mark())
							else
								divisor = 1
							continue
						case "_": original += reader.read(); continue
						case "0": value += 0; original += reader.read(); break
						case "1": value += 1; original += reader.read(); break
						case "2": value += 2; original += reader.read(); break
						case "3": value += 3; original += reader.read(); break
						case "4": value += 4; original += reader.read(); break
						case "5": value += 5; original += reader.read(); break
						case "6": value += 6; original += reader.read(); break
						case "7": value += 7; original += reader.read(); break
						case "8": value += 8; original += reader.read(); break
						case "9": value += 9; original += reader.read(); break
						default: result = new Number(divisor ? value / divisor : value, original, reader.mark()); continue
					}
					value *= 10
					if (divisor)
						divisor *= 10
				}
			} else {
				result = null
			}
			return result
		}
		private static isNumber(character: string): boolean {
			return character >= "0" && character <= "9"
		}
		private static scanOctal(reader: IO.BufferedReader): Token {
			var result: Token
			if (reader.peek(2) == "0c") {
				var original = reader.read(2)
				var value: number
				var divisor: number
				while (!result) {
					switch (reader.peek()) {
						case ".":
							original += reader.read()
							if (divisor)
								result = new Number(divisor ? value / divisor : value, original, reader.mark())
							else
								divisor = 1
							continue
						case "_": original += reader.read(); continue
						case "0": value += 0; original += reader.read(); break
						case "1": value += 1; original += reader.read(); break
						case "2": value += 2; original += reader.read(); break
						case "3": value += 3; original += reader.read(); break
						case "4": value += 4; original += reader.read(); break
						case "5": value += 5; original += reader.read(); break
						case "6": value += 6; original += reader.read(); break
						case "7": value += 7; original += reader.read(); break
						default: result = new Number(divisor ? value / divisor : value, original, reader.mark()); continue
					}
					value *= 8
					if (divisor)
						divisor *= 8
				}
			} else {
				result = null
			}
			return result
		}
		private static scanBinary(reader: IO.BufferedReader): Token {
			var result: Token
			if (reader.peek(2) == "0b") {
				var original = reader.read(2)
				var value: number
				var divisor: number
				while (!result) {
					switch (reader.peek()) {
						case ".":
							original += reader.read()
							if (divisor)
								result = new Number(divisor ? value / divisor : value, original, reader.mark())
							else
								divisor = 1
							continue
						case "_": original += reader.read(); continue
						case "0": value += 0; original += reader.read(); break
						case "1": value += 1; original += reader.read(); break
						default: result = new Number(divisor ? value / divisor : value, original, reader.mark()); continue
					}
					value *= 2
					if (divisor)
						divisor *= 2
				}
			} else {
				result = null
			}
			return result
		}
	}
}
