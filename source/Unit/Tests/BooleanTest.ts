/// <reference path="../Fixture" />
/// <reference path="../Constraints/Is" />

module Magic.Unit.Tests {
	import Is = Constraints.Is
	export class BooleanTest extends Fixture {
		constructor() {
			super("BooleanTest")
			this.add("true is true", () => {
				this.expect(true, Is.True())
			})
			this.add("false is false", () => {
				this.expect(false, Is.False())
			})
			this.add("foo === foo (true)", () => {
				this.expect("foo" === "foo", Is.True())
			})
			this.add("foo === bar (false)", () => {
				this.expect("foo" === "bar", Is.False())
			})
		}
	}
}
