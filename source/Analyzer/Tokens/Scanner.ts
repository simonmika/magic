export default class Scanner {	
	private sourceLength: number;
	private sourceIndex: number;
	private sourceEofIndex: number;
	private currentChar: string;
	
	constructor(private sourceString: string) {
		this.sourceIndex = 0;
		this.sourceLength = sourceString.length;
		this.sourceEofIndex = sourceString.length;
	}
	
	getNext() {
		if(!this.hasNext())
			this.currentChar = null;
		else {
			this.currentChar = this.sourceString.charAt(this.sourceIndex);
			this.sourceIndex++;
		}
		return this.currentChar;
	}
	
	hasNext() {
		return this.sourceIndex < this.sourceLength;
	}
	
	// Disallow negative skips? May cause endless loops.
	skip(offset: number = 1) {
		if(this.sourceIndex - offset < 0)
			throw Error("Can not skip to a negative index.")
		var newPosition = this.sourceIndex + offset;
		this.sourceIndex = newPosition >= this.sourceEofIndex ? this.sourceEofIndex : newPosition; 
	}
}