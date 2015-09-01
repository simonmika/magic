/// <reference path="Constraint" />

module Magic.Unit.Constraints {
	export class TrueConstraint extends Constraint {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		test(value: any) {
			return value === true
		}
	}
}