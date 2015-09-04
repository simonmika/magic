/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Token" />
/// <reference path="../Identifier" />
/// <reference path="../Source" />

module Magic.Tokens.Tests {
	import Is = Unit.Constraints.Is
	export class IdentifierTest extends Unit.Fixture {
		constructor() {
			super("Tokens.Identifier")
			var errorHandler = new Error.ConsoleHandler()
			this.add("isIdentifier()", () => {
				var identifier1 = new Identifier(null, null)
				var identifier2 = new Identifier("bar", null)
				this.expect(identifier1.isIdentifier())
				this.expect(identifier1.isIdentifier(""), Is.True())
				this.expect(identifier1.isIdentifier("foo"), Is.False())
				this.expect(identifier2.isIdentifier())
				this.expect(identifier2.isIdentifier("foo"), Is.False())
			})
			this.add("scan identifier", () => {
				var source = new Source(new IO.StringReader("identifier"), errorHandler)
				var token = Identifier.scan(source)
				this.expect(token instanceof Identifier)
				this.expect(token.isIdentifier())
				this.expect((<Identifier>token).getName(), Is.Equal().To("identifier"))
			})
		}
	}
	Unit.Fixture.add(new IdentifierTest())
}