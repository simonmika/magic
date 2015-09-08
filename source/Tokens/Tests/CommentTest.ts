/// <reference path="../../Error/ConsoleHandler" />
/// <reference path="../../IO/StringReader" />
/// <reference path="../../Unit/Fixture" />
/// <reference path="../../Unit/Constraints/Is" />
/// <reference path="../Token" />
/// <reference path="../Comment" />
/// <reference path="../Source" />

module Magic.Tokens.Tests {
	import Is = Unit.Constraints.Is
	export class CommentTest extends Unit.Fixture {
		constructor() {
			super("Tokens.Comment")
			var errorHandler = new Error.ConsoleHandler()
			this.add("line comment", () => {
				var source = new Source(new IO.StringReader("//this is a line comment"), errorHandler)
				var token = Comment.scan(source)
				this.expect(token instanceof Comment)
				this.expect((<Comment>token).getContent(), Is.Equal().To("this is a line comment"))
			})
			this.add("block comment, single line", () => {
				var source = new Source(new IO.StringReader("/*this is a block comment*/"), errorHandler)
				var token = Comment.scan(source)
				this.expect(token instanceof Comment)
				this.expect((<Comment>token).getContent(), Is.Equal().To("this is a block comment"))
			})
			this.add("block comment, multiple lines", () => {
				var source = new Source(new IO.StringReader("/*this\nis\na\nblock\ncomment*/"), errorHandler)
				var token = Comment.scan(source)
				this.expect(token instanceof Comment)
				this.expect((<Comment>token).getContent(), Is.Equal().To("this\nis\na\nblock\ncomment"))
			})
		}
	}
	Unit.Fixture.add(new CommentTest())
}
