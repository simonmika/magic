import fs = require("fs");

import Lexer = require("./Lexer");
import Token = require("./Token");
import TokenKind = require("./TokenKind");
import Expression = require("./Expressions/Expression");
import Precedence = require("./Precedence");
import PrefixParselet = require("./Parselets/PrefixParselet");
import InfixParselet = require("./Parselets/InfixParselet");
import IdentifierParselet = require("./Parselets/IdentifierParselet");
import PrefixOperatorParselet = require("./Parselets/PrefixOperatorParselet");
import InfixOperatorParselet = require("./Parselets/InfixOperatorParselet");
import PostfixOperatorParselet = require("./Parselets/PostfixOperatorParselet");
import PrefixWhitespaceParselet = require("./Parselets/PrefixWhitespaceParselet");
import PostfixWhitespaceParselet = require("./Parselets/PostfixWhitespaceParselet");
import NumericLiteralParselet = require("./Parselets/NumericLiteralParselet");
import ConditionalParselet = require("./Parselets/ConditionalParselet");
import BooleanLiteralParselet = require("./Parselets/BooleanLiteralParselet");
import ClosedGroupParselet = require("./Parselets/ClosedGroupParselet");
import AssignmentParselet = require("./Parselets/AssignmentParselet");

class Parser
{
	private lexer: Lexer;	
	private lookaheadToken: Token; // LL(1)
	
	private prefixParselets: { [key: number]: PrefixParselet; } = {};
	private infixParselets: { [key: number]: InfixParselet; } = {};
		
	constructor(private sourceFile: string) {
		// TODO:
		//	We should probably keep a static repository of all the 
		//	registered parselets, otherwise we have to perform registration
		//	for each parser instance (currently one per file)
		this.registerParselets();
		this.initializeLexer();
		this.lookaheadToken = this.lexer.getNextToken();
	}
	
	parse(precedence: number = 0) {
		var token = this.advance();
		var prefix: PrefixParselet = this.getPrefixParselet(token.getKind());
		if(prefix === null) {
			this.throwError("unable to parse '" + token + "'");
		}
		var left = prefix.parse(this, token);
		while(precedence < this.getNextTokenPrecedence()) {
			token = this.advance();
			var infix = this.getInfixParselet(token.getKind());
			left = infix.parse(this, left, token);
		}
		return left;
	}
		
	public expect(expected: TokenKind, advance = true) {
		var token = this.lookaheadToken;
		var found = token.getKind();
		if(found != expected) {
			this.throwError("expected '" + TokenKind[expected] + "' but found '" + TokenKind[found] + "'.");
		}
		return advance ? this.advance() : token;
	}
	
	public advance() {
		var token = this.lookaheadToken;
		this.lookaheadToken = this.lexer.getNextToken();
		return token;
	}
	
	public throwError(error: string) {
		throw new Error("Parser: " + error);
	}
	
	private initializeLexer() {
		try {
			this.lexer = new Lexer(fs.readFileSync(this.sourceFile, "utf-8"));
		} catch(Error) {
			this.throwError("unable to read file: '" + this.sourceFile + "'");
		}
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
		
		// Custom parselets
		this.prefixParselets[TokenKind.WhitespaceSpace] = new PrefixWhitespaceParselet(TokenKind.WhitespaceSpace);
		this.prefixParselets[TokenKind.Identifier] = new IdentifierParselet();
		this.prefixParselets[TokenKind.LiteralNumber] = new NumericLiteralParselet();
		this.prefixParselets[TokenKind.LiteralBoolean] = new BooleanLiteralParselet();
		this.prefixParselets[TokenKind.SeparatorLeftParanthesis] = new ClosedGroupParselet(TokenKind.SeparatorRightParanthesis);
		
		// Prefix operators
		this.prefixParselets[TokenKind.OperatorNot] = new PrefixOperatorParselet(TokenKind.OperatorNot, Precedence.Prefix);
		this.prefixParselets[TokenKind.OperatorNegate] = new PrefixOperatorParselet(TokenKind.OperatorNegate, Precedence.Prefix);
		this.prefixParselets[TokenKind.OperatorDereference] = new PrefixOperatorParselet(TokenKind.OperatorDereference, Precedence.Prefix);
		this.prefixParselets[TokenKind.OperatorAssign] = new PrefixOperatorParselet(TokenKind.OperatorAssign, Precedence.Prefix);;
	}
	
	private registerInfixParselets() {
		//
		// Custom parselets
		//
		this.infixParselets[TokenKind.OperatorConditional] = new ConditionalParselet();
		this.infixParselets[TokenKind.OperatorAssign] = new AssignmentParselet();
		
		//
		// Left-associative operators
		//
		
		// Arithmetic
		this.infixParselets[TokenKind.OperatorAdd] = new InfixOperatorParselet(TokenKind.OperatorAdd, Precedence.Sum);
		this.infixParselets[TokenKind.OperatorSubtract] = new InfixOperatorParselet(TokenKind.OperatorSubtract, Precedence.Sum);
		this.infixParselets[TokenKind.OperatorMultiply] = new InfixOperatorParselet(TokenKind.OperatorMultiply, Precedence.Product);
		this.infixParselets[TokenKind.OperatorDivide] = new InfixOperatorParselet(TokenKind.OperatorDivide, Precedence.Product);
		this.infixParselets[TokenKind.OperatorModulo] = new InfixOperatorParselet(TokenKind.OperatorModulo, Precedence.Product);
		
		// Bitwise
		this.infixParselets[TokenKind.OperatorBitwiseXor] = new InfixOperatorParselet(TokenKind.OperatorBitwiseXor, Precedence.Bitwise);
		this.infixParselets[TokenKind.OperatorBitwiseAnd] = new InfixOperatorParselet(TokenKind.OperatorBitwiseAnd, Precedence.Bitwise);
		this.infixParselets[TokenKind.OperatorBitwiseOr] = new InfixOperatorParselet(TokenKind.OperatorBitwiseOr, Precedence.Bitwise);
		this.infixParselets[TokenKind.OperatorRightShift] = new InfixOperatorParselet(TokenKind.OperatorRightShift, Precedence.Bitwise);
		this.infixParselets[TokenKind.OperatorLeftShift] = new InfixOperatorParselet(TokenKind.OperatorLeftShift, Precedence.Bitwise);
		
		// Assignment
		this.infixParselets[TokenKind.OperatorAddAssign] = new InfixOperatorParselet(TokenKind.OperatorAddAssign, Precedence.Assignment);
		this.infixParselets[TokenKind.OperatorSubtractAssign] = new InfixOperatorParselet(TokenKind.OperatorSubtractAssign, Precedence.Assignment);
		this.infixParselets[TokenKind.OperatorMultiplyAssign] = new InfixOperatorParselet(TokenKind.OperatorMultiplyAssign, Precedence.Assignment);
		this.infixParselets[TokenKind.OperatorDivideAssign] = new InfixOperatorParselet(TokenKind.OperatorDivideAssign, Precedence.Assignment);
		this.infixParselets[TokenKind.OperatorExponentAssign] = new InfixOperatorParselet(TokenKind.OperatorExponentAssign, Precedence.Assignment);
		this.infixParselets[TokenKind.OperatorLeftShiftAssign] = new InfixOperatorParselet(TokenKind.OperatorLeftShiftAssign, Precedence.Assignment);
		this.infixParselets[TokenKind.OperatorRightShiftAssign] = new InfixOperatorParselet(TokenKind.OperatorRightShiftAssign, Precedence.Assignment);
		this.infixParselets[TokenKind.OperatorBitwiseXorAssign] = new InfixOperatorParselet(TokenKind.OperatorBitwiseXorAssign, Precedence.Assignment);
		this.infixParselets[TokenKind.OperatorBitwiseAndAssign] = new InfixOperatorParselet(TokenKind.OperatorBitwiseAndAssign, Precedence.Assignment);
		this.infixParselets[TokenKind.OperatorBitwiseOrAssign] = new InfixOperatorParselet(TokenKind.OperatorBitwiseOrAssign, Precedence.Assignment);
		this.infixParselets[TokenKind.OperatorDeclareAssign] = new InfixOperatorParselet(TokenKind.OperatorDeclareAssign, Precedence.Assignment);
		this.infixParselets[TokenKind.OperatorDeclarePropertyAssign] = new InfixOperatorParselet(TokenKind.OperatorDeclarePropertyAssign, Precedence.Assignment);
		
		// Comparison
		this.infixParselets[TokenKind.OperatorEquals] = new InfixOperatorParselet(TokenKind.OperatorEquals, Precedence.Comparison);
		this.infixParselets[TokenKind.OperatorLessThanOrEqual] = new InfixOperatorParselet(TokenKind.OperatorLessThanOrEqual, Precedence.Comparison);
		this.infixParselets[TokenKind.OperatorGreaterThanOrEqual] = new InfixOperatorParselet(TokenKind.OperatorGreaterThanOrEqual, Precedence.Comparison);
		this.infixParselets[TokenKind.OperatorNotEqual] = new InfixOperatorParselet(TokenKind.OperatorNotEqual, Precedence.Comparison);
		this.infixParselets[TokenKind.OperatorLessThan] = new InfixOperatorParselet(TokenKind.OperatorLessThan, Precedence.Comparison);
		this.infixParselets[TokenKind.OperatorGreaterThan] = new InfixOperatorParselet(TokenKind.OperatorGreaterThan, Precedence.Comparison);
		this.infixParselets[TokenKind.OperatorComparison] = new InfixOperatorParselet(TokenKind.OperatorComparison, Precedence.Comparison);
		this.infixParselets[TokenKind.OperatorDeclareCompare] = new InfixOperatorParselet(TokenKind.OperatorDeclareCompare, Precedence.Comparison);
		
		//
		// Right-associative operators
		//
		
		// Range
		this.infixParselets[TokenKind.OperatorRange] = new InfixOperatorParselet(TokenKind.OperatorRange, Precedence.Range, false);
		
		// Exponent
		this.infixParselets[TokenKind.OperatorExponent] = new InfixOperatorParselet(TokenKind.OperatorExponent, Precedence.Exponent, true);
		
		// Logical
		this.infixParselets[TokenKind.OperatorLogicalOr] = new InfixOperatorParselet(TokenKind.OperatorLogicalOr, Precedence.Logical, true);
		this.infixParselets[TokenKind.OperatorLogicalAnd] = new InfixOperatorParselet(TokenKind.OperatorLogicalAnd, Precedence.Logical, true);
	}
	
	private registerPostfixParselets() {
		this.infixParselets[TokenKind.WhitespaceSpace] = new PostfixWhitespaceParselet(TokenKind.WhitespaceSpace);
	}
	
}

export = Parser;