/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../Error/Position" />
/// <reference path="../../Error/Location" />
/// <reference path="../../Error/Region" />
/// <reference path="../../IO/BufferedReader" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />

module Magic.IO.Tests {
	import Is = Unit.Constraints.Is
	export class BufferedReaderTest extends Unit.Fixture {
		constructor() {
			super("IO.BufferedReader")
			var errorHandler = new Error.ConsoleHandler()
			this.add("empty", () => {
				var br = new IO.BufferedReader(new IO.StringReader(""))
				this.expect(br.isEmpty())
			})
			this.add("state check", () => {
				var br = new IO.BufferedReader(new IO.StringReader(""))
				this.expect(br.getLocation(), Is.Not().NullOrUndefined())
				this.expect(br.getRegion(), Is.Not().NullOrUndefined())
				this.expect(br.getResource(), Is.Not().NullOrUndefined())
			})
			this.add("peek", () => {
				var br = new IO.BufferedReader(new IO.StringReader("foobar"))
				this.expect(br.peek(1) === "f")
				this.expect(br.peek(2) === "fo")
				this.expect(br.peek(3) === "foo")
				this.expect(br.peek(4) === "foob")
				this.expect(br.peek(5) === "fooba")
				this.expect(br.peek(6) === "foobar")
			})
			this.add("read one at a time", () => {
				var sr = new IO.BufferedReader(new IO.StringReader("abcdef"))
				this.expect(sr.read() === "a")
				this.expect(sr.read() === "b")
				this.expect(sr.read() === "c")
				this.expect(sr.read() === "d")
				this.expect(sr.read() === "e")
				this.expect(sr.read() === "f")
			})
			this.add("read three at a time", () => {
				var br = new IO.BufferedReader(new IO.StringReader("abcdef"))
				this.expect(br.read(3) === "abc")
				this.expect(br.read(3) === "def")
			})
			this.add("read three at a time with a newline", () => {
				var br = new IO.BufferedReader(new IO.StringReader("abc\ndef"))
				this.expect(br.read(3) === "abc")
				this.expect(br.read(1) === "\n")
				this.expect(br.read(3) === "def")
			})
			this.add("string location", () => {
				var br = new IO.BufferedReader(new IO.StringReader("abc\ndef"))
				this.expect(br.getLocation().getColumn() === 1 && br.getLocation().getLine() === 1)
				br.read()
				this.expect(br.getLocation().getColumn() === 2 && br.getLocation().getLine() === 1)
				br.read()
				this.expect(br.getLocation().getColumn() === 3 && br.getLocation().getLine() === 1)
				br.read()
				this.expect(br.getLocation().getColumn() === 4 && br.getLocation().getLine() === 1)
				br.read()
				this.expect(br.getLocation().getColumn() === 1 && br.getLocation().getLine() === 2)
				br.read()
				this.expect(br.getLocation().getColumn() === 2 && br.getLocation().getLine() === 2)
				br.read()
				this.expect(br.getLocation().getColumn() === 3 && br.getLocation().getLine() === 2)
				br.read()
				this.expect(br.isEmpty())
			})
			this.add("tabs and newlines location", () => {
				var br = new IO.BufferedReader(new IO.StringReader("\t\t\t\n\t\t\t"))
				this.expect(br.getLocation().getColumn() === 1 && br.getLocation().getLine() === 1)
				br.read()
				this.expect(br.getLocation().getColumn() === 2 && br.getLocation().getLine() === 1)
				br.read()
				this.expect(br.getLocation().getColumn() === 3 && br.getLocation().getLine() === 1)
				br.read()
				this.expect(br.getLocation().getColumn() === 4 && br.getLocation().getLine() === 1)
				br.read()
				this.expect(br.getLocation().getColumn() === 1 && br.getLocation().getLine() === 2)
				br.read()
				this.expect(br.getLocation().getColumn() === 2 && br.getLocation().getLine() === 2)
				br.read()
				this.expect(br.getLocation().getColumn() === 3 && br.getLocation().getLine() === 2)
				br.read()
				this.expect(br.isEmpty())
			})
			this.add("mark", () => {
				var br = new BufferedReader(new IO.StringReader("abc\0"))
				this.expect(br.mark(), Is.Not().NullOrUndefined())
				br.read(); br.read(); br.read()
				var region = br.getRegion()
				this.expect(region.getStart().getLine() === 1 && region.getStart().getColumn() === 1)
				this.expect(region.getEnd().getLine() === 1 && region.getEnd().getColumn() === 4)
			})
		}
	}
}
