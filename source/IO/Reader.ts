/// <reference path="Position" />
/// <reference path="Location" />
/// <reference path="Region" />

module Magic.IO {
	export interface Reader {
		isEmpty(): boolean
		read(): string;
		getResource(): string
		getLocation(): Location
		mark(): Region
	}
}
