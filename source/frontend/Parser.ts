import fs = require("fs");

import Lexer = require("./Lexer");
import Token = require("./Token");
import TokenKind = require("./TokenKind");
import Precedence = require("./Precedence");
import Expression = require("./Expressions/Expression");
import PrefixExpression = require("./Expressions/PrefixExpression");
import InfixExpression = require("./Expressions/InfixExpression");
import PrefixOperatorExpression = require("./Expressions/PrefixOperatorExpression");
import InfixOperatorExpression = require("./Expressions/InfixOperatorExpression");
import PrefixWhitespaceExpression = require("./Expressions/PrefixWhitespaceExpression");
import PostfixWhitespaceExpression = require("./Expressions/PostfixWhitespaceExpression");
import NumericLiteralExpression = require("./Expressions/NumericLiteralExpression");
import IdentifierExpression = require("./Expressions/IdentifierExpression");
import ConditionalExpression = require("./Expressions/ConditionalExpression");
import ClosedGroupExpression = require("./Expressions/ClosedGroupExpression");
import AssignExpression = require("./Expressions/AssignExpression");
import DeclareExpression = require("./Expressions/DeclareExpression");
import DeclareAssignExpression = require("./Expressions/DeclareAssignExpression");

class Parser
{
	private lexer: Lexer;	
	private lookaheadToken: Token; // LL(1)
	
	private prefixExpressions: { [key: number]: PrefixExpression; } = {};
	private infixExpressions: { [key: number]: InfixExpression; } = {};
		
	constructor(private sourceFile: string) {
		// TODO:
		//	We should probably keep a static repository of all the 
		//	registered expressions, otherwise we have to perform registration
		//	for each parser instance (currently one per file)
		this.registerExpressions();
		this.initializeLexer();
		this.lookaheadToken = this.lexer.getNextToken();
	}
	
	parse(precedence: number = 0) {
		var token = this.advance();
		var prefix: PrefixExpression = this.getPrefixExpression(token.getKind());
		if(prefix === null) {
			this.throwError("unable to parse '" + token + "'");
		}
		var left = prefix.parse(this, token);
		while(precedence < this.getNextTokenPrecedence()) {
			token = this.advance();
			var infix = this.getInfixExpression(token.getKind());
			left = infix.parse(this, left, token);
		}
		return left;
	}
		
	public expect(expected: TokenKind, advance = true) {
		var token = this.lookaheadToken;
		var found = token.getKind();
		if(found != expected) {
			this.throwError("expected '" + TokenKind[expected] +
							"' but found '" + TokenKind[found] + "' ('" + token.getValue() + "')");
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
		var infix = this.getInfixExpression(this.lookaheadToken.getKind());
		if(infix !== null) {
			result = infix.getPrecedence();
		}
		return result;
	}
	
	private getPrefixExpression(kind: TokenKind) {
		var result = this.prefixExpressions[kind];
		return result !== undefined ? result : null;
	}
	
	private getInfixExpression(kind: TokenKind) {
		var result = this.infixExpressions[kind];
		return result !== undefined ? result : null;
	}
	
	private registerExpressions() {
		this.registerPrefixExpressions();
		this.registerInfixExpressions();
		this.registerPostfixExpressions();
	}
	
	private registerPrefixExpressions() {
		/*	
		this.prefixExpressions[TokenKind.LiteralBoolean] = new BooleanLiteralExpression();
		
		*/
		
		// Custom Expressions, such as identifier, whitespaces and literals
		this.prefixExpressions[TokenKind.WhitespaceTab] = new PrefixWhitespaceExpression(TokenKind.WhitespaceTab);
		this.prefixExpressions[TokenKind.WhitespaceSpace] = new PrefixWhitespaceExpression(TokenKind.WhitespaceSpace);


		this.prefixExpressions[TokenKind.LiteralNumber] = new NumericLiteralExpression();
		this.prefixExpressions[TokenKind.Identifier] = new IdentifierExpression();
		this.prefixExpressions[TokenKind.SeparatorLeftParanthesis] = new ClosedGroupExpression(TokenKind.SeparatorRightParanthesis);
		
		// Prefix operators
		this.prefixExpressions[TokenKind.OperatorNot] = new PrefixOperatorExpression(TokenKind.OperatorNot, Precedence.Prefix);
		this.prefixExpressions[TokenKind.OperatorNegate] = new PrefixOperatorExpression(TokenKind.OperatorNegate, Precedence.Prefix);
		this.prefixExpressions[TokenKind.OperatorDereference] = new PrefixOperatorExpression(TokenKind.OperatorDereference, Precedence.Prefix);
		// Should this have a custom expression, init: func(=someMember).
		this.prefixExpressions[TokenKind.OperatorAssign] = new PrefixOperatorExpression(TokenKind.OperatorAssign, Precedence.Prefix);
	}
	
	private registerInfixExpressions() {
		//
		// Custom Expressions
		//
		this.infixExpressions[TokenKind.OperatorConditional] = new ConditionalExpression();
		// NOTE: The assignment parser does not currently check if the left expression is an identifier.
		//		 Where do we do this? When we're walking the tree?
		this.infixExpressions[TokenKind.OperatorAssign] = new AssignExpression();
		//this.infixExpressions[TokenKind.SeparatorColon] = new DeclareExpression();
		this.infixExpressions[TokenKind.OperatorDeclareAssign] = new DeclareAssignExpression();
		
		//
		// Left-associative operators
		//
		
		// Arithmetic
		this.infixExpressions[TokenKind.OperatorAdd] = new InfixOperatorExpression(TokenKind.OperatorAdd, Precedence.Sum);
		this.infixExpressions[TokenKind.OperatorSubtract] = new InfixOperatorExpression(TokenKind.OperatorSubtract, Precedence.Sum);
		this.infixExpressions[TokenKind.OperatorMultiply] = new InfixOperatorExpression(TokenKind.OperatorMultiply, Precedence.Product);
		this.infixExpressions[TokenKind.OperatorDivide] = new InfixOperatorExpression(TokenKind.OperatorDivide, Precedence.Product);
		this.infixExpressions[TokenKind.OperatorModulo] = new InfixOperatorExpression(TokenKind.OperatorModulo, Precedence.Product);
		
		// Bitwise
		this.infixExpressions[TokenKind.OperatorBitwiseXor] = new InfixOperatorExpression(TokenKind.OperatorBitwiseXor, Precedence.Bitwise);
		this.infixExpressions[TokenKind.OperatorBitwiseAnd] = new InfixOperatorExpression(TokenKind.OperatorBitwiseAnd, Precedence.Bitwise);
		this.infixExpressions[TokenKind.OperatorBitwiseOr] = new InfixOperatorExpression(TokenKind.OperatorBitwiseOr, Precedence.Bitwise);
		this.infixExpressions[TokenKind.OperatorRightShift] = new InfixOperatorExpression(TokenKind.OperatorRightShift, Precedence.Bitwise);
		this.infixExpressions[TokenKind.OperatorLeftShift] = new InfixOperatorExpression(TokenKind.OperatorLeftShift, Precedence.Bitwise);
		
		// Assignment
		this.infixExpressions[TokenKind.OperatorAddAssign] = new InfixOperatorExpression(TokenKind.OperatorAddAssign, Precedence.Assignment);
		this.infixExpressions[TokenKind.OperatorSubtractAssign] = new InfixOperatorExpression(TokenKind.OperatorSubtractAssign, Precedence.Assignment);
		this.infixExpressions[TokenKind.OperatorMultiplyAssign] = new InfixOperatorExpression(TokenKind.OperatorMultiplyAssign, Precedence.Assignment);
		this.infixExpressions[TokenKind.OperatorDivideAssign] = new InfixOperatorExpression(TokenKind.OperatorDivideAssign, Precedence.Assignment);
		this.infixExpressions[TokenKind.OperatorExponentAssign] = new InfixOperatorExpression(TokenKind.OperatorExponentAssign, Precedence.Assignment);
		this.infixExpressions[TokenKind.OperatorLeftShiftAssign] = new InfixOperatorExpression(TokenKind.OperatorLeftShiftAssign, Precedence.Assignment);
		this.infixExpressions[TokenKind.OperatorRightShiftAssign] = new InfixOperatorExpression(TokenKind.OperatorRightShiftAssign, Precedence.Assignment);
		this.infixExpressions[TokenKind.OperatorBitwiseXorAssign] = new InfixOperatorExpression(TokenKind.OperatorBitwiseXorAssign, Precedence.Assignment);
		this.infixExpressions[TokenKind.OperatorBitwiseAndAssign] = new InfixOperatorExpression(TokenKind.OperatorBitwiseAndAssign, Precedence.Assignment);
		this.infixExpressions[TokenKind.OperatorBitwiseOrAssign] = new InfixOperatorExpression(TokenKind.OperatorBitwiseOrAssign, Precedence.Assignment);
		this.infixExpressions[TokenKind.OperatorDeclareAssign] = new InfixOperatorExpression(TokenKind.OperatorDeclareAssign, Precedence.Assignment);
		this.infixExpressions[TokenKind.OperatorDeclarePropertyAssign] = new InfixOperatorExpression(TokenKind.OperatorDeclarePropertyAssign, Precedence.Assignment);
		
		// Comparison
		this.infixExpressions[TokenKind.OperatorEquals] = new InfixOperatorExpression(TokenKind.OperatorEquals, Precedence.Comparison);
		this.infixExpressions[TokenKind.OperatorLessThanOrEqual] = new InfixOperatorExpression(TokenKind.OperatorLessThanOrEqual, Precedence.Comparison);
		this.infixExpressions[TokenKind.OperatorGreaterThanOrEqual] = new InfixOperatorExpression(TokenKind.OperatorGreaterThanOrEqual, Precedence.Comparison);
		this.infixExpressions[TokenKind.OperatorNotEqual] = new InfixOperatorExpression(TokenKind.OperatorNotEqual, Precedence.Comparison);
		this.infixExpressions[TokenKind.OperatorLessThan] = new InfixOperatorExpression(TokenKind.OperatorLessThan, Precedence.Comparison);
		this.infixExpressions[TokenKind.OperatorGreaterThan] = new InfixOperatorExpression(TokenKind.OperatorGreaterThan, Precedence.Comparison);
		this.infixExpressions[TokenKind.OperatorComparison] = new InfixOperatorExpression(TokenKind.OperatorComparison, Precedence.Comparison);
		this.infixExpressions[TokenKind.OperatorDeclareCompare] = new InfixOperatorExpression(TokenKind.OperatorDeclareCompare, Precedence.Comparison);
		
		// Range
		this.infixExpressions[TokenKind.OperatorRange] = new InfixOperatorExpression(TokenKind.OperatorRange, Precedence.Range);
		
		//
		// Right-associative operators
		//
		
		// Exponent
		this.infixExpressions[TokenKind.OperatorExponent] = new InfixOperatorExpression(TokenKind.OperatorExponent, Precedence.Exponent, true);
		
		// Logical
		this.infixExpressions[TokenKind.OperatorLogicalOr] = new InfixOperatorExpression(TokenKind.OperatorLogicalOr, Precedence.Logical, true);
		this.infixExpressions[TokenKind.OperatorLogicalAnd] = new InfixOperatorExpression(TokenKind.OperatorLogicalAnd, Precedence.Logical, true);
	}
	
	private registerPostfixExpressions() {
		this.infixExpressions[TokenKind.WhitespaceTab] = new PostfixWhitespaceExpression(TokenKind.WhitespaceTab);
		this.infixExpressions[TokenKind.WhitespaceSpace] = new PostfixWhitespaceExpression(TokenKind.WhitespaceSpace);
		this.infixExpressions[TokenKind.WhitespaceLineFeed] = new PostfixWhitespaceExpression(TokenKind.WhitespaceLineFeed);
	}
	
}

export = Parser;