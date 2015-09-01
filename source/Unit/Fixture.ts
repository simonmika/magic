/// <reference path="Test" />
/// <reference path="TestFailedError" />
/// <reference path="./Constraints/Constraint" />

module Magic.Unit {
	export class Fixture {
		private tests: Test[] = []
		constructor(private name: string) {
		}
		getName(): string { return this.name }
		add(name: string, action: () => void): void {
			this.tests.push(new Test(name, action))
		}
		run(): void {
			var failures: TestFailedError[] = []
			var success = true
			this.tests.forEach(test => {
				try {
					test.run()
				} catch (TestFailedError) {
					success = false
					TestFailedError.setTest(test)
					failures.push(TestFailedError)
				}
			})
			console.log(this.name + ":", success ? "passed" : "failed")
			if(!success) {
				failures.forEach(failure => {
					console.log("  ->", failure.getTest().toString())
				})
				//process.exit(1)
			}
		}
		expect(value: any, constraint: Constraints.Constraint): void {
			if (!constraint.verify(value))
				throw new TestFailedError(value, constraint)
		}
	}
}
