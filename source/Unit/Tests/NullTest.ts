/// <reference path="../Fixture" />
/// <reference path="../Constraints/Is" />

module Magic.Unit.Tests {
	import Is = Constraints.Is
	export class NullTest extends Fixture {
		constructor() {
			super("NullTest")
			this.add("null test 1", () => {
				this.expect(null, Is.Null())
			})
			this.add("null test 2", () => {
				var s: string = null
				this.expect(s, Is.Null())
			})
		}
	}
}
