/// <reference path="Modifier" />
/// <reference path="CompareConstraint" />

module Magic.Unit.Constraints {
	export class EqualModifier extends Modifier {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		To(correct: any): CompareConstraint {
			var comparer = function(objectA: any, objectB: any) {
				return objectA == objectB
			}
			return new CompareConstraint(correct, comparer, this)
		}
	}
}
