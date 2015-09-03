/// <reference path="../../../Error/ConsoleHandler" />
/// <reference path="../../../IO/StringReader" />
/// <reference path="../../Token" />
/// <reference path="../Number" />
/// <reference path="../../Source" />
/// <reference path="../../../Unit/Fixture" />
/// <reference path="../../../Unit/Constraints/Is" />

module Magic.Tokens.Literals.Tests {
	import Is = Unit.Constraints.Is
	export class NumberTest extends Unit.Fixture {
		constructor() {
			super("NumberToken")
			var errorHandler = new Error.ConsoleHandler()
			var token: Token
			this.add("integer #1", () => {
				var numberString = "000012"
				var source = new Source(new IO.StringReader(numberString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === parseInt(numberString))
			})
			this.add("integer #2", () => {
				var numberString = "12345678900"
				var source = new Source(new IO.StringReader(numberString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === parseInt(numberString))
			})
			this.add("float #1", () => {
				var numberString = "000012.21"
				var source = new Source(new IO.StringReader(numberString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === parseFloat(numberString))
			})
			this.add("float #2", () => {
				var numberString = "12345678.900"
				var source = new Source(new IO.StringReader(numberString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === parseFloat(numberString))
			})
			this.add("float #3", () => {
				var numberString = "0.0000012"
				var source = new Source(new IO.StringReader(numberString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === parseFloat(numberString))
			})
			this.add("float #4", () => {
				var numberString = ".01f"
				var source = new Source(new IO.StringReader(numberString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === parseFloat(numberString))
			})
			this.add("binary #1", () => {
				var binaryString = "0b00000000"
				var source = new Source(new IO.StringReader(binaryString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === 0)
			})
			this.add("binary #2", () => {
				var binaryString = "0b100000001"
				var source = new Source(new IO.StringReader(binaryString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === 257)
			})
			this.add("octal #1", () => {
				var octalString = "0c0"
				var source = new Source(new IO.StringReader(octalString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === 0)
			})
			this.add("octal #2", () => {
				var octalString = "0c10"
				var source = new Source(new IO.StringReader(octalString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === 8)
			})
			this.add("octal #3", () => {
				var octalString = "0c20000"
				var source = new Source(new IO.StringReader(octalString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === 8192)
			})
			this.add("hexadecimal #1", () => {
				var hexadecimalString = "0x0"
				var source = new Source(new IO.StringReader(hexadecimalString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === 0)
			})
			this.add("hexadecimal #2", () => {
				var hexadecimalString = "0xF"
				var source = new Source(new IO.StringReader(hexadecimalString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === 15)
			})
			this.add("hexadecimal #3", () => {
				var hexadecimalString = "0xB0D16F"
				var source = new Source(new IO.StringReader(hexadecimalString), errorHandler)
				this.expect((token = Number.scan(source)) instanceof Number && (<Number>token).getValue() === 11587951)
			})
		}
	}
	Unit.Fixture.add(new NumberTest())
}
