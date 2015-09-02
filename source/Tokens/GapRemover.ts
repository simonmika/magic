/// <reference path="../Utilities/Iterator" />
/// <reference path="../Utilities/BufferedIterator" />
/// <reference path="Token" />
/// <reference path="Gap" />
/// <reference path="Substance" />
/// <reference path="Whitespace" />

module Magic.Tokens {
	export class GapRemover implements Utilities.Iterator<Substance> {
		private backend: Utilities.BufferedIterator<Token>
		constructor(backend: Utilities.Iterator<Token>) {
			this.backend = new Utilities.BufferedIterator(backend)
		}
		next(): Substance {
			var pre: Gap[] = []
			while (this.backend.peek() instanceof Gap) {
				pre.push(this.backend.next())
			}
			var result: Substance
			if (!(this.backend.peek() instanceof Substance))
				throw "Lexical Error: Missing end of file token.";
			result = <Substance>this.backend.next()
			var post: Gap[] = []
			while (this.backend.peek() instanceof Gap) {
				var next = this.backend.next()
				post.push(next)
				if (next instanceof Whitespace && (<Whitespace>next).getEndsLine()) {
					break;
				}
			}
			result.setPregap(pre)
			result.setPostgap(post)
			return result
		}
	}
}
