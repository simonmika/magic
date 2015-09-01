/// <reference path="Modifier" />
/// <reference path="CompareConstraint" />
/// <reference path="FalseConstraint" />
/// <reference path="TrueConstraint" />
/// <reference path="EqualModifier" />
/// <reference path="NullConstraint" />

module Magic.Unit.Constraints {
	export class NotModifier extends Modifier {
		constructor(parent: Modifier = null) {
			super(parent)
		}
		test(value: any): boolean {
			return !(this.testChild(value))
		}
		Null() { return new NullConstraint(this) }
		False() { return new FalseConstraint(this) }
		True() { return new TrueConstraint(this) }
		Equal() { return new EqualModifier(this) }
		Not() { return new NotModifier(this) }
	}
}
