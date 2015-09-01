module Magic.Unit {
	export class Test {
		constructor(private name: string, private action: () => boolean) {
		}
		getName() { return this.name }
		getAction() { return this.action }
		run() {
			return this.action()
		}
		toString() {
			return this.name
		}
	}
}