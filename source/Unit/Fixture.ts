/// <reference path="Test" />
/// <reference path="TestFailedError" />
/// <reference path="../Error/ConsoleHandler" />
/// <reference path="./Constraints/Constraint" />
/// <reference path="./Constraints/TrueConstraint" />
/// <reference path="../Utilities/String" />

module Magic.Unit {
	export class Fixture {
		private tests: Test[] = []
		private expectIdentifier = 0
		private consoleHandler: Error.ConsoleHandler
		constructor(private name: string, private reportOnPass = true) {
			this.consoleHandler = new Error.ConsoleHandler()
		}
		getName(): string { return this.name }
		add(name: string, action: () => void): void {
			this.tests.push(new Test(name, action))
		}
		run(): boolean {
			var failures: TestFailedError[] = []
			var result = true
			for (var i = 0; i < this.tests.length; i++) {
				try {
					this.tests[i].run()
				} catch (Error) {
					if (Error instanceof TestFailedError) {
						var e = <TestFailedError>Error
						e.setTest(this.tests[i])
						e.setExpectIdentifier(this.expectIdentifier)
						failures.push(e)
						result = false
					} else {
						console.dir("[Fixture]", Error)
						throw Error
					}
				}
				this.expectIdentifier = 0
			}
			if ((result && this.reportOnPass) || !result)
				this.prettyPrintTestResult(result)

			if (!result)
				for (var i = 0; i < failures.length; i++) {
					var expectedMessage = "expected '" + failures[i].getConstraint().getExpectedValue().toString() + "', found '" + failures[i].getValue() + "'"
					var whereMessage = "[expect #" + failures[i].getExpectIdentifier() + " in '" + failures[i].getTest().toString() + "']"
					this.consoleHandler.raise("  -> " + expectedMessage + " " + whereMessage)
				}
			return result;
		}
		expect(value: any, constraint: Constraints.Constraint = null): void {
			this.expectIdentifier++
			if (constraint == null)
				constraint = new Constraints.TrueConstraint()
			if (!constraint.verify(value))
				throw new TestFailedError(value, constraint)
		}
		//
		// This is a temporary thing to make it easier on the eyes when reading
		// test results in the terminal.
		//
		private prettyPrintTestResult(success: boolean) {
			var coloredString = "\x1b[" + (success ? "32mpassed" : "31mfailed")
			var colorReset = "\x1b[0m"
			var message = coloredString + colorReset
			var result = Utilities.String.padRight(this.name, ".", 35) + ": " + message
			console.log(result)
		}

		private static fixtures: Fixture[] = []
		static add(fixture: Fixture) {
			Fixture.fixtures.push(fixture)
		}
		static run() {
			for (var i = 0; i < Fixture.fixtures.length; i++)
				Fixture.fixtures[i].run()
		}
	}
}
