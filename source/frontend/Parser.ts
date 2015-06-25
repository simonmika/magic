import fs = require("fs");

import Lexer = require("./Lexer");
import Token = require("./Token");
import TokenKind = require("./TokenKind");
import Expression = require("./Expressions/Expression");
import PrefixParselet = require("./Parselets/PrefixParselet");
import InfixParselet = require("./Parselets/InfixParselet");
import IdentifierParselet = require("./Parselets/IdentifierParselet");
import PrefixOperatorParselet = require("./Parselets/PrefixOperatorParselet");
import InfixOperatorParselet = require("./Parselets/InfixOperatorParselet");
import PostfixOperatorParselet = require("./Parselets/PostfixOperatorParselet");

class Parser
{
	private lexer: Lexer;	
	private lookaheadToken: Token; // LL(1)
	
	private prefixParselets: { [key: number]: PrefixParselet; } = {};
	private infixParselets: { [key: number]: InfixParselet; } = {};
		
	constructor(private sourceFile: string) {
		this.registerParselets();
		this.initializeLexer();
		this.lookaheadToken = this.lexer.getNextToken();
	}
	
	parse(precedence: number = 0) {
		var token = this.advance();
		var prefix: PrefixParselet = this.getPrefixParselet(token.getKind());
		if(prefix === null) {
			throw new Error("Parser: unable to parse '" + token + "'");
		}
		var left = prefix.parse(this, token);
		while(precedence < this.getNextTokenPrecedence()) {
			token = this.advance();
			var infix = this.getInfixParselet(token.getKind());
			left = infix.parse(this, left, token);
		}
		return left;
	}
	
	private initializeLexer() {
		try {
			this.lexer = new Lexer(fs.readFileSync(this.sourceFile, "utf-8"));
		} catch(Error) {
			console.log("Parser: unable to read file: '" + this.sourceFile + "'");
		}
	}
	
	public expect(expected: TokenKind) {
		var token = this.lookaheadToken;
		var found = token.getKind();
		if(found != expected) {
			throw new Error("Parser: expected '" + TokenKind[expected] + "' and found '" + TokenKind[found] + "'");
		}
		return this.advance();
	}
	
	public advance() {
		var token = this.lookaheadToken;
		this.lookaheadToken	= this.lexer.getNextToken();
		return token;
	}
	
	private getNextTokenPrecedence() {
		var result = 0;
		var infix = this.getInfixParselet(this.lookaheadToken.getKind());
		if(infix !== null) {
			result = infix.getPrecedence();
		}
		return result;
	}
	
	private getPrefixParselet(kind: TokenKind) {
		var result = this.prefixParselets[kind];
		return result !== undefined ? result : null;
	}
	
	private getInfixParselet(kind: TokenKind) {
		var result = this.infixParselets[kind];
		return result !== undefined ? result : null;
	}
	
	private registerParselets() {
		this.registerPrefixParselets();
		this.registerInfixParselets();
		this.registerPostfixParselets();
	}
	
	private registerPrefixParselets() {
		var ident = new IdentifierParselet();
		var space = new PrefixOperatorParselet(TokenKind.WhitespaceSpace, 100);
		this.prefixParselets[TokenKind.WhitespaceSpace] = space;
		this.prefixParselets[TokenKind.Identifier] = ident;
	}
	
	private registerInfixParselets() {
		var opAdd = new InfixOperatorParselet(TokenKind.OperatorAdd, 10);
		var opSub = new InfixOperatorParselet(TokenKind.OperatorSubtract, 10);
		var opMul = new InfixOperatorParselet(TokenKind.OperatorMultiply, 20);
		var opDiv = new InfixOperatorParselet(TokenKind.OperatorDivide, 20);
		this.infixParselets[TokenKind.OperatorAdd] = opAdd;
		this.infixParselets[TokenKind.OperatorSubtract] = opSub;
		this.infixParselets[TokenKind.OperatorMultiply] = opMul;
		this.infixParselets[TokenKind.OperatorDivide] = opDiv;	
	}
	
	private registerPostfixParselets() {
		var space = new PostfixOperatorParselet(TokenKind.WhitespaceSpace, 100);
		this.infixParselets[TokenKind.WhitespaceSpace] = space;
	}
	
}

export = Parser;