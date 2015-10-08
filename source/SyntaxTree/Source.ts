/// <reference path="../Error/Region" />
/// <reference path="../Error/Handler" />
/// <reference path="../Utilities/Iterator" />
/// <reference path="../Utilities/BufferedIterator" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/Substance" />

module Magic.SyntaxTree {
	export class Source implements Utilities.Iterator<Tokens.Substance>, Error.Handler {
		private tokens: Utilities.BufferedIterator<Tokens.Substance>
		private lastTokens: Tokens.Substance[] = []
		constructor(backend: Utilities.Iterator<Tokens.Substance>, private errorHandler: Error.Handler) {
			this.tokens = new Utilities.BufferedIterator(backend)
		}
		peek(position: number = 0): Tokens.Substance {
			return this.tokens.peek(position)
		}
		next(): Tokens.Substance {
			var result = this.tokens.next()
			this.lastTokens.push(result)
			return result
		}
		mark(): Tokens.Substance[] {
			var result = this.lastTokens
			this.lastTokens = []
			return result
		}
		raise(message: string | Error.Message, level = Error.Level.Critical, type = Error.Type.Gramatical, region?: Error.Region): void {
			if (typeof message == "string") {
				if (!region)
					region = this.peek().getRegion()
				message = new Error.Message(<string>message, level, type, region)
			}
			this.errorHandler.raise(message.toString())
		}
	}
}
