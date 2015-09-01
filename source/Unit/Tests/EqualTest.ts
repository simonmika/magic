/// <reference path="../Fixture" />
/// <reference path="../Constraints/Is" />

module Magic.Unit.Tests {
	import Is = Constraints.Is
	export class EqualTest extends Fixture {
		constructor() {
			super("EqualTest")
			this.add("true is true", () => {
				this.expect(true, Is.Equal().To(true))
			})
			this.add("false is false", () => {
				this.expect(false, Is.Equal().To(false))
			})
			this.add("true is not false", () => {
				this.expect(true === false, Is.Equal().To(false))
			})
			this.add("false is not true", () => {
				this.expect(false === true, Is.Equal().To(false))
			})
			this.add("foo equals foo", () => {
				this.expect("foo" === "foo", Is.Equal().To(true))
			})
			this.add("foo does not equal bar", () => {
				this.expect("foo" === "bar", Is.Equal().To(false))
			})
			this.add("null === null", () => {
				this.expect(null, Is.Equal().To(null))
			})
			this.add("undefined === undefined", () => {
				this.expect(undefined, Is.Equal().To(undefined))
			})
		}
	}
}
