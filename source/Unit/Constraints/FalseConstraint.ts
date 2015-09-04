/// <reference path="Constraint" />

module Magic.Unit.Constraints {
	export class FalseConstraint extends Constraint {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		test(value: any): boolean {
			return value == false
		}
	}
}
