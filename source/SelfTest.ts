/// <reference path="./Unit/Fixture" />
/// <reference path="./Unit/Tests/BooleanTest" />
/// <reference path="./Unit/Tests/NullTest" />
/// <reference path="./Unit/Tests/EqualTest" />
/// <reference path="./Unit/Tests/NotTest" />

module Magic {
	export class SelfTest {
		static run() {
			//
			// Scan source code folder for files that are tests?
			//
			var tests: Unit.Fixture[] = [
				new Unit.Tests.BooleanTest(),
				new Unit.Tests.NullTest(),
				new Unit.Tests.EqualTest(),
				new Unit.Tests.NotTest()
			]
			tests.forEach(test => {
				test.run()
			})
		}
	}
}