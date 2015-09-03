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
			var result: Token
			(result = this.scanBinary(source)) ||
			(result = this.scanOctal(source)) ||
			(result = this.scanHexadecimal(source)) ||
			(result = this.scanDecimal(source))
			return result
		}
		private static scanHexadecimal(reader: IO.BufferedReader): Token {
			var result: Token
			if (reader.peek(2) == "0x") {
				var original = reader.read(2)
				var value: number = 0
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
						case "0": value = value * 16 + 0; original += reader.read(); break
						case "1": value = value * 16 + 1; original += reader.read(); break
						case "2": value = value * 16 + 2; original += reader.read(); break
						case "3": value = value * 16 + 3; original += reader.read(); break
						case "4": value = value * 16 + 4; original += reader.read(); break
						case "5": value = value * 16 + 5; original += reader.read(); break
						case "6": value = value * 16 + 6; original += reader.read(); break
						case "7": value = value * 16 + 7; original += reader.read(); break
						case "8": value = value * 16 + 8; original += reader.read(); break
						case "9": value = value * 16 + 9; original += reader.read(); break
						case "A": case "a": value = value * 16 + 10; original += reader.read(); break
						case "B": case "b": value = value * 16 + 11; original += reader.read(); break
						case "C": case "c": value = value * 16 + 12; original += reader.read(); break
						case "D": case "d": value = value * 16 + 13; original += reader.read(); break
						case "E": case "e": value = value * 16 + 14; original += reader.read(); break
						case "F": case "f": value = value * 16 + 15; original += reader.read(); break
						default: result = new Number(divisor ? value / divisor : value, original, reader.mark()); continue
					}
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
				var original: string = ""
				var value: number = 0
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
						case "0": value = value * 10 + 0; original += reader.read(); break
						case "1": value = value * 10 + 1; original += reader.read(); break
						case "2": value = value * 10 + 2; original += reader.read(); break
						case "3": value = value * 10 + 3; original += reader.read(); break
						case "4": value = value * 10 + 4; original += reader.read(); break
						case "5": value = value * 10 + 5; original += reader.read(); break
						case "6": value = value * 10 + 6; original += reader.read(); break
						case "7": value = value * 10 + 7; original += reader.read(); break
						case "8": value = value * 10 + 8; original += reader.read(); break
						case "9": value = value * 10 + 9; original += reader.read(); break
						default:
							result = new Number(divisor ? value / divisor : value, original, reader.mark()); continue
					}
					if (divisor)
						divisor *= 10
				}
			} else {
				result = null
			}
			return result
		}
		private static scanOctal(reader: IO.BufferedReader): Token {
			var result: Token
			if (reader.peek(2) == "0c") {
				var original = reader.read(2)
				var value: number = 0
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
						case "0": value = value * 8 + 0; original += reader.read(); break
						case "1": value = value * 8 + 1; original += reader.read(); break
						case "2": value = value * 8 + 2; original += reader.read(); break
						case "3": value = value * 8 + 3; original += reader.read(); break
						case "4": value = value * 8 + 4; original += reader.read(); break
						case "5": value = value * 8 + 5; original += reader.read(); break
						case "6": value = value * 8 + 6; original += reader.read(); break
						case "7": value = value * 8 + 7; original += reader.read(); break
						default: result = new Number(divisor ? value / divisor : value, original, reader.mark()); continue
					}
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
				var value: number = 0
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
						case "0": value = value * 2 + 0; original += reader.read(); break
						case "1": value = value * 2 + 1; original += reader.read(); break
						default: result = new Number(divisor ? value / divisor : value, original, reader.mark()); continue
					}
					if (divisor)
						divisor *= 2
				}
			} else {
				result = null
			}
			return result
		}
		private static isNumber(character: string): boolean {
			return character >= "0" && character <= "9"
		}
	}
}
