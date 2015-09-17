/// <reference path="../Utilities/Iterator" />
/// <reference path="Token" />

module Magic.Tokens {
	export class Consumer {
		constructor(private backend: Utilities.Iterator<Token>) {
		}
		run() {
			while (this.backend.next())
				;
		}
	}
}
