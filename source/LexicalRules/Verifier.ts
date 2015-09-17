/// <reference path="../Error/Handler" />
/// <reference path="../Utilities/Iterator" />
/// <reference path="../Utilities/BufferedIterator" />
/// <reference path="../Tokens/Substance" />
/// <reference path="Rule" />

module Magic.LexicalRules {
	export class Verifier implements Utilities.Iterator<Tokens.Substance> {
		constructor(private backend: Utilities.Iterator<Tokens.Substance>, private handler: Error.Handler) {
		}
		next(): Tokens.Substance {
			var result = this.backend.next()
			Rule.verify(this.handler, result)
			return result
		}
	}
}
