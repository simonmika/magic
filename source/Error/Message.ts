/// <reference path="Type" />
/// <reference path="Level" />

module Magic.Error {
	export class Message {
		constructor(private type: Type, private level: Level, private message: Message, private location: Location) {

		}
	}
}