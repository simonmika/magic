/// <reference path="Constraint" />

module Magic.Unit.Constraints {
	export class CompareConstraint extends Constraint {
		constructor(private correct: any, private comparer: (objectA: any, objectB: any) => boolean, parent: Modifier = null) {
			super(parent)
		}
		test(value: any): boolean {
			return this.comparer(value, this.correct)
		}
	}
}
