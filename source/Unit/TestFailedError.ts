/// <reference path="./Constraints/Constraint" />

module Magic.Unit {
	export class TestFailedError implements Error {
		public name = "TestFailedError"
		private test: Test
		constructor(private value: any, private constraint: Constraints.Constraint, public message: string = null) {
		}
		getValue(): any { return this.value }
		getConstraint(): Constraints.Constraint { return this.constraint }
		getName(): string { return this.name }
		getTest() { return this.test }
		setTest(test: Test) {
			this.message = test.getName()
			this.test = test
		}
		toString(): string {
			return this.name + ": " + this.test.getName()
		}
	}
}
