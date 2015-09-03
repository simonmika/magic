/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Iterator" />
/// <reference path="../BufferedIterator" />

module Magic.Utilities.Tests {
	class StringIterator implements Iterator<string> {
		private position: number = 0
		constructor(private content: string) {
			if (!content)
				content = ""
		}
		next(): string {
			var ret = this.position < this.content.length ? this.content.charAt(this.position++) : null
			return ret
		}
	}
	export class BufferedIteratorTest extends Unit.Fixture {
		constructor() {
			super("BufferedIterator")
			this.add("empty string", () => {
				var bi = new BufferedIterator(new StringIterator(""))
				this.expect(bi.next() === null)
			})
			this.add("iterate using peek()", () => {
				var testString = "let's iterate this string using peek()"
				var bi = new BufferedIterator(new StringIterator(testString))
				var result: string = ""
				while (bi.peek()) {
					result += bi.next()
				}
				this.expect(result === testString)
			})
			this.add("iterate using next()", () => {
				var testString = "let's iterate this string using next()"
				var bi = new BufferedIterator(new StringIterator(testString))
				var character: string
				var result: string = ""
				while ((character = bi.next())) {
					result += character
				}
				this.expect(result === testString)
			})
			this.add("peek() and next()", () => {
				var testString = "abcdef"
				var bi = new BufferedIterator(new StringIterator(testString))
				// Force the reader to buffer the entire string
				this.expect(bi.peek(5) === "f")
				this.expect(bi.next() == "a")
				this.expect(bi.next() == "b")
				this.expect(bi.next() == "c")
				this.expect(bi.next() == "d")
				this.expect(bi.next() == "e")
				this.expect(bi.next() == "f")
			})
		}
	}
	Unit.Fixture.add(new BufferedIteratorTest())
}
