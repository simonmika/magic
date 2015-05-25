export default class Token {
	constructor(private raw: string) {}
	toString() { return this.raw; }
}