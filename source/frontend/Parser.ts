import fs = require("fs");

import Lexer = require("./Lexer");
import Token = require("./Tokens/Token");
import TokenKind = require("./Tokens/TokenKind");
import Expression = require("./Expressions/Expression"); 
import PrefixParselet = require("./Parselets/PrefixParselet");
import InfixParselet = require("./Parselets/InfixParselet");

class Parser
{
	constructor(private sourceFile: string) {}

	test() {
		var source = fs.readFileSync(this.sourceFile, "utf-8");
		var lexer = new Lexer(source);
		var t: Token;
		while(((t = lexer.getNextToken()).getKind() !== TokenKind.Eof)) {
			console.log(TokenKind[t.getKind()] + "'" + t.toString() + "'");
		}
	}
	
	parse(precedence: number): Expression {
		return null;
	}
	
	// Registers a prefix
	prefix(kind: TokenKind, parselet: PrefixParselet) {
		
	}
	
	// Registers an infix
	infix(kind: TokenKind, parselet: InfixParselet) {
		
	}
	
	// Registers a postfix
	postfix(kind: TokenKind, parselet: InfixParselet) {
		
	}
	
}

export = Parser;