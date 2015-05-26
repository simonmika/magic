export default class Scanner {
	
	private sourceLength: number;
	private sourceIndex: number;
	private sourceEofIndex: number;
	private currentColumn: number;
	private currentLine: number;
	
	constructor(private sourceString: string) {
		this.sourceIndex = 0;
		this.sourceLength = sourceString.length;
		this.sourceEofIndex = sourceString.length;
		this.currentColumn = 1;
		this.currentLine = 1;
	}
	
	getNext() {
		var currentChar: string;
		if(!this.hasNext())
			currentChar = null;
		else {
			currentChar = this.sourceString.charAt(this.sourceIndex);
			if(currentChar === "\n") {
				this.currentLine++;
				this.currentColumn = 1;
			} else {
				this.currentColumn++;
			}
			this.sourceIndex++;
		}
		return currentChar;
	}
	
	hasNext() {
		return this.sourceIndex < this.sourceEofIndex;
	}
	
	peek() {
		return this.hasNext() ? this.sourceString.charAt(this.sourceIndex) : null;
	}
	
	getCurrentColumn() {
		return this.currentColumn;
	}
	
	getCurrentLine() {
		return this.currentLine;
	}
		
}