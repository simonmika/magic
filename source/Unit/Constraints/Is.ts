/// <reference path="FalseConstraint" />
/// <reference path="TrueConstraint" />
/// <reference path="NullConstraint" />
/// <reference path="EqualModifier" />
/// <reference path="NotModifier" />

module Magic.Unit.Constraints {
	export class Is {
		static True() { return new TrueConstraint() }
		static False() { return new FalseConstraint() }
		static Null() { return new NullConstraint() }
		static Equal() { return new EqualModifier() }
		static Not() { return new NotModifier() }
	}
}
