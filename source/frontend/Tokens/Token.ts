class Token 
{
	constructor(private tokenString: string) { }
	
	toString() {
		return this.tokenString;
	}	
}

export = Token;