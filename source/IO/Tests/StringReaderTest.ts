/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../Error/Position" />
/// <reference path="../../Error/Location" />
/// <reference path="../../Error/Region" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />

module Magic.IO.Tests {
	import Is = Unit.Constraints.Is
	export class StringReaderTest extends Unit.Fixture {
		constructor() {
			super("StringReader")
			var errorHandler = new Error.ConsoleHandler()
			this.add("empty", () => {
				var sr = new IO.StringReader("")
				this.expect(sr.isEmpty())
			})
			this.add("state check", () => {
				var sr = new IO.StringReader("")
				this.expect(sr.getLocation(), Is.Not().NullOrUndefined())
				this.expect(sr.getRegion(), Is.Not().NullOrUndefined())
				this.expect(sr.getResource(), Is.Not().NullOrUndefined())
			})
			this.add("simple string", () => {
				var sr = new IO.StringReader("abcdef")
				this.expect(sr.read() === "a")
				this.expect(sr.read() === "b")
				this.expect(sr.read() === "c")
				this.expect(sr.read() === "d")
				this.expect(sr.read() === "e")
				this.expect(sr.read() === "f")
			})
			this.add("simple string with location", () => {
				var sr = new IO.StringReader("abc\ndef")
				this.expect(sr.getLocation().getColumn() === 1 && sr.getLocation().getLine() === 1)
				sr.read()
				this.expect(sr.getLocation().getColumn() === 2 && sr.getLocation().getLine() === 1)
				sr.read()
				this.expect(sr.getLocation().getColumn() === 3 && sr.getLocation().getLine() === 1)
				sr.read()
				this.expect(sr.getLocation().getColumn() === 4 && sr.getLocation().getLine() === 1)
				sr.read()
				this.expect(sr.getLocation().getColumn() === 1 && sr.getLocation().getLine() === 2)
				sr.read()
				this.expect(sr.getLocation().getColumn() === 2 && sr.getLocation().getLine() === 2)
				sr.read()
				this.expect(sr.getLocation().getColumn() === 3 && sr.getLocation().getLine() === 2)
				sr.read()
				this.expect(sr.isEmpty())
			})
			this.add("tabs and newlines", () => {
				var sr = new IO.StringReader("\t\t\t\n\t\t\t")
				this.expect(sr.getLocation().getColumn() === 1 && sr.getLocation().getLine() === 1)
				sr.read()
				this.expect(sr.getLocation().getColumn() === 2 && sr.getLocation().getLine() === 1)
				sr.read()
				this.expect(sr.getLocation().getColumn() === 3 && sr.getLocation().getLine() === 1)
				sr.read()
				this.expect(sr.getLocation().getColumn() === 4 && sr.getLocation().getLine() === 1)
				sr.read()
				this.expect(sr.getLocation().getColumn() === 1 && sr.getLocation().getLine() === 2)
				sr.read()
				this.expect(sr.getLocation().getColumn() === 2 && sr.getLocation().getLine() === 2)
				sr.read()
				this.expect(sr.getLocation().getColumn() === 3 && sr.getLocation().getLine() === 2)
				sr.read()
				this.expect(sr.isEmpty())
			})
			this.add("mark", () => {
				var sr = new IO.StringReader("abc\0")
				this.expect(sr.mark(), Is.Not().NullOrUndefined())
				sr.read(); sr.read(); sr.read()
				var region = sr.getRegion()
				this.expect(region.getStart().getLine() === 1 && region.getStart().getColumn() === 1)
				this.expect(region.getEnd().getLine() === 1 && region.getEnd().getColumn() === 4)
			})
		}
	}
}
