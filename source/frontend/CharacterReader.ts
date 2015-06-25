class CharacterReader
{
	public static NullCharacter: string = "\0";
	public static LineFeedCharacter: string = "\n";
	
	private index: number = 0;
	
	constructor(private sourceText: string) {}
	
	peek() {
		return this.hasNext() ? this.sourceText.charAt(this.index) : CharacterReader.NullCharacter
	}
	
	rewind(characters: number) {
		this.index -= characters;
	}
	
	ignoreNext() {
		this.index++;
	}

	hasNext() {
		return this.index < this.sourceText.length;
	}
	
	getNext() {
		var next: string;
		if(!this.hasNext())
			next = CharacterReader.NullCharacter;
		else {
			next = this.sourceText.charAt(this.index);
			this.index++
		}
		return next;
	}
}

export = CharacterReader;