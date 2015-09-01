/// <reference path="Test" />
module Magic.Unit {
	export class Fixture {
		private tests: Test[] = []
		constructor(private name: string) {
		}
		getName() { return this.name }
		add(name: string, action: () => boolean) {
			this.tests.push(new Test(name, action))
		}
		run() {
			this.tests.forEach(test => {
				if (!test.run()) {
					console.log("test failed: " + test.toString())
				}
			});
		}
	}
}