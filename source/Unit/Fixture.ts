/// <reference path="Test" />
/// <reference path="TestFailedError" />
/// <reference path="./Constraints/Constraint" />

module Magic.Unit {
	export class Fixture {
		private tests: Test[] = []
		private expectId = 0
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
				} catch (Error) {
					if (Error instanceof(TestFailedError)) {
						var e = <TestFailedError>Error
						e.setTest(test)
						e.setExpectId(this.expectId)
						failures.push(e)
						success = false
					}
				}
			})
			console.log(this.name + ":", success ? "passed" : "failed")
			if(!success) {
				failures.forEach(failure => {
					console.log("  -> expect #" + failure.getExpectId() + ", name: '" + failure.getTest().toString() + "'")
				})
				//process.exit(1)
			}
		}
		expect(value: any, constraint: Constraints.Constraint): void {
			this.expectId++
			if (!constraint.verify(value))
				throw new TestFailedError(value, constraint)
		}
	}
}
