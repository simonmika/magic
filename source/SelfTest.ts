/// <reference path="./Unit/Fixture" />
/// <reference path="./Unit/Tests/BooleanTest" />
/// <reference path="./Unit/Tests/NullTest" />
/// <reference path="./Unit/Tests/NullOrUndefinedTest" />
/// <reference path="./Unit/Tests/UndefinedTest" />
/// <reference path="./Unit/Tests/EqualTest" />
/// <reference path="./Unit/Tests/NotTest" />
/// <reference path="./Tokens/Tests/LexerTest" />

module Magic {
	export class SelfTest {
		static run() {
			var tests: Unit.Fixture[] = [
				// Unit/Tests
				new Unit.Tests.BooleanTest(),
				new Unit.Tests.NullTest(),
				new Unit.Tests.NullOrUndefinedTest(),
				new Unit.Tests.UndefinedTest(),
				new Unit.Tests.EqualTest(),
				new Unit.Tests.NotTest(),
				// Tokens/Tests
				new Tokens.Tests.LexerTest()
			]
			tests.forEach(test => {
				test.run()
			})
		}
	}
}