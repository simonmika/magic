/// <reference path="Constraint" />

module Magic.Unit.Constraints {
	export class EmptyConstraint extends Constraint {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		test(value: string | Array<any>): boolean {
			return value.length === 0
		}
	}
}
