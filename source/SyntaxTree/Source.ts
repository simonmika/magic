/// <reference path="../Error/Region" />
/// <reference path="../Error/Handler" />
/// <reference path="../Utilities/Iterator" />
/// <reference path="../Utilities/BufferedIterator" />
/// <reference path="../Tokens/Token" />
/// <reference path="../Tokens/Substance" />

module Magic.SyntaxTree {
	export class Source extends Utilities.BufferedIterator<Tokens.Substance> implements Error.Handler {
		constructor(backend: Utilities.Iterator<Tokens.Substance>, private errorHandler: Error.Handler) {
			super(backend)
		}
		raise(message: string | Error.Message, level = Error.Level.Critical, type = Error.Type.Gramatical, region?: Error.Region): void {
			if (message instanceof String) {
				if (!region) {
					region = this.peek().getRegion()
				}
				message = new Error.Message(<string>message, level, type, region)
			}
			console.log(message.toString())
		}
	}
}
