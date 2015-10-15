/// <reference path="../Error/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="../Error/Handler" />

module Magic.Tokens {
	export class Source extends IO.BufferedReader implements Error.Handler {
		constructor(reader: IO.Reader, private errorHandler: Error.Handler) {
			super(reader)
		}
		raise(message: string | Error.Message, level = Error.Level.Critical, type = Error.Type.Lexical, region?: Error.Region): void {
			if (typeof message == "string") {
				if (!region) {
					region = this.getRegion()
				}
				message = new Error.Message(<string>message, level, type, region)
			}
			console.log(message.toString())
		}
	}
}
