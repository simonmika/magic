/// <reference path="Type" />
/// <reference path="Level" />

module Magic.Error {
	export class Message {
		constructor(private description: string, private level: Level, private type: Type, private region: Region) {
		}
		toString(): string {
			return Level[this.level] + ": " + Type[this.type] + " error. " + this.description + " @ " + this.region.toString();
		}
	}
}
