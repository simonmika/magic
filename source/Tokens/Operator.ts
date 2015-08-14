/// <reference path="../IO/Region" />
/// <reference path="../IO/BufferedReader" />
/// <reference path="Token" />

module Magic.Tokens {
	export class Operator extends Token {
		constructor(private symbol: Operators, value: string, region: IO.Region) {
			super(region, value)
		}
		getSymbol(): Operators {
			return this.symbol
		}
		static scan(reader: IO.BufferedReader): Token {
			var result: Token;
			switch (reader.peek()) {
				case "@": result = new Operator(Operators.Dereference, reader.read(), reader.mark()); break
				case "+":
					switch (reader.peek(2)) {
						default: result = new Operator(Operators.Add, reader.read(), reader.mark()); break
						case "+=": result = new Operator(Operators.AddAssign, reader.read(2), reader.mark()); break
					} break
				case "-":
					switch (reader.peek(2)) {
						default: result = new Operator(Operators.Substract, reader.read(), reader.mark()); break
						case "-=": result = new Operator(Operators.SubtractAssign, reader.read(2), reader.mark()); break
						case "->": result = new Operator(Operators.ReturnType, reader.read(2), reader.mark()); break
					} break
				case "*":
					switch (reader.peek(2)) {
						default: result = new Operator(Operators.Multiply, reader.read(), reader.mark()); break
						case "**":
							switch (reader.peek(3)) {
								default: result = new Operator(Operators.Exponent, reader.read(2), reader.mark()); break
								case "**=": result = new Operator(Operators.ExponentAssign, reader.read(3), reader.mark()); break
							} break
						case "*=": result = new Operator(Operators.MultiplyAssign, reader.read(2), reader.mark()); break
					} break
				case "/":
					switch (reader.peek(2)) {
						default:
							result = new Operator(Operators.Divide, reader.read(), reader.mark()); break
						case "/=":
							result = new Operator(Operators.DivideAssign, reader.read(2), reader.mark()); break
					}; break
				case "=":
					switch (reader.peek(2)) {
						default: result = new Operator(Operators.Assign, reader.read(), reader.mark()); break
						case "==": result = new Operator(Operators.Equals, reader.read(2), reader.mark()); break
						case "=>": result = new Operator(Operators.DoubleArrow, reader.read(2), reader.mark()); break
					} break
				case "^":
					switch (reader.peek(2)) {
						default: result = new Operator(Operators.BitwiseXor, reader.read(), reader.mark()); break
						case "^=":result = new Operator(Operators.BitwiseXorAssign, reader.read(2), reader.mark()); break
					} break
				case "|":
					switch (reader.peek(2)) {
						default: result = new Operator(Operators.BitwiseOr, reader.read(), reader.mark()); break
						case "||": result = new Operator(Operators.LogicalOr, reader.read(2), reader.mark()); break
						case "|=": result = new Operator(Operators.BitwiseOrAssign, reader.read(2), reader.mark()); break
					} break
				case "&":
					switch (reader.peek(2)) {
						default: result = new Operator(Operators.BitwiseAnd, reader.read(), reader.mark()) ;break
						case "&&": result = new Operator(Operators.LogicalAnd, reader.read(2), reader.mark()); break
						case "&=": result = new Operator(Operators.BitwiseAndAssign, reader.read(2), reader.mark()); break
					} break
				case "!":
					switch (reader.peek(2)) {
						default: result = new Operator(Operators.Not, reader.read(), reader.mark()); break
						case "!=": result = new Operator(Operators.NotEqual, reader.read(2), reader.mark()); break
					} break
				case "<":
					switch (reader.peek(2)) {
						default: result = new Operator(Operators.LessThan, reader.read(), reader.mark()); break
						case "<<":
							switch (reader.peek(3)) {
								default: result = new Operator(Operators.LeftShift, reader.read(2), reader.mark()); break
								case "<<=": result = new Operator(Operators.LeftShiftAssign, reader.read(3), reader.mark()); break
							} break
						case "<=":
							switch (reader.peek(4)) {
								default: result = new Operator(Operators.LessThanOrEqual, reader.read(2), reader.mark()); break
								case "<==>": result = new Operator(Operators.Comparison, reader.read(4), reader.mark()); break
							} break
					} break
				case ">":
					switch (reader.peek(2)) {
						default: result = new Operator(Operators.GreaterThan, reader.read(), reader.mark()); break
						case ">>":
							switch (reader.peek(3)) {
								default: result = new Operator(Operators.RightShift, reader.read(2), reader.mark()); break
								case ">>=": result = new Operator(Operators.RightShiftAssign, reader.read(3), reader.mark()); break
							} break
						case ">=": result = new Operator(Operators.GreaterThanOrEqual, reader.read(2), reader.mark()); break
					}
					break
				case ":":
					switch (reader.peek(2)) {
						default: result = null /* separator */; break
						case ":=": result = new Operator(Operators.Assign, reader.read(2), reader.mark()); break
						case "::":
							switch (reader.peek(3)) {
								default: result = null /* undefined */; break
								case "::=": result = new Operator(Operators.DeclarePropertyAssign, reader.read(3), reader.mark()); break
							} break
					} break
				case ".":
					switch (reader.peek(2)) {
						default: result = null /* separator */; break
						case "..": result = new Operator(Operators.Range, reader.read(2), reader.mark()); break
					} break
				case "%": result = new Operator(Operators.Modulo, reader.read(), reader.mark()); break
				case "~": result = new Operator(Operators.Negate, reader.read(), reader.mark()); break
				case "?": result = new Operator(Operators.Conditional, reader.read(), reader.mark()); break
				default: result = null; break
			}
			return result
		}

		private static asString(symbol: Operators): string {
			var result: string
			switch (symbol) {
				case Operators.Dereference:
					result = "@"
				case Operators.Add:
					result = "+"
				case Operators.Substract:
					result = "-"
				case Operators.Multiply:
					result = "*"
				case Operators.Divide:
					result = "/"
				case Operators.Exponent:
					result = "**"
				case Operators.LeftShift:
					result = "<<"
				case Operators.RightShift:
					result = ">>"
				case Operators.BitwiseXor:
					result = "^"
				case Operators.BitwiseAnd:
					result = "&"
				case Operators.BitwiseOr:
					result = "|"
				case Operators.LogicalOr:
					result = "||"
				case Operators.LogicalAnd:
					result = "&&"
				case Operators.AddAssign:
					result = "+="
				case Operators.SubtractAssign:
					result = "-="
				case Operators.MultiplyAssign:
					result = "*="
				case Operators.DivideAssign:
					result = "/="
				case Operators.ExponentAssign:
					result = "**="
				case Operators.LeftShiftAssign:
					result = "<<="
				case Operators.RightShiftAssign:
					result = ">>="
				case Operators.BitwiseXorAssign:
					result = "^="
				case Operators.BitwiseAndAssign:
					result = "&="
				case Operators.BitwiseOrAssign:
					result = "|="
				case Operators.Modulo:
					result = "%"
				case Operators.Assign:
					result = "="
				case Operators.Equals:
					result = "=="
				case Operators.LessThanOrEqual:
					result = "<="
				case Operators.GreaterThanOrEqual:
					result = ">="
				case Operators.NotEqual:
					result = "!="
				case Operators.Not:
					result = "!"
				case Operators.LessThan:
					result = "<"
				case Operators.GreaterThan:
					result = ">"
				case Operators.Comparison:
					result = "<==>"
				case Operators.Negate:
					result = "~"
				case Operators.DeclareAssign:
					result = ":="
				case Operators.DeclareCompare:
					result = ":=="
				case Operators.DeclarePropertyAssign:
					result = "::="
				case Operators.Conditional:
					result = "?"
				case Operators.Range:
					result = ".."
				case Operators.ReturnType:
					result = "->"
				case Operators.DoubleArrow:
					result = "=>"
			}
			return result
		}
	}

	export enum	Operators {
		Dereference,			/*	@	*/
		Add,					/*  + 	*/
		Substract,					/*  - 	*/
		Multiply,				/*  * 	*/
		Divide,					/*  / 	*/
		Exponent,				/*	**	*/
		LeftShift,				/*	<<	*/
		RightShift,				/*	>>	*/
		BitwiseXor,				/*	^	*/
		BitwiseAnd,				/*	&	*/
		BitwiseOr,				/*	|	*/
		LogicalOr,				/*	||	*/
		LogicalAnd,				/*	&&	*/
		AddAssign,				/*	+=	*/
		SubtractAssign,			/*	-=	*/
		MultiplyAssign,			/*	*=	*/
		DivideAssign,			/*	/=	*/
		ExponentAssign,			/*	**=	*/
		LeftShiftAssign,		/*	<<=	*/
		RightShiftAssign,		/*	>>=	*/
		BitwiseXorAssign,		/*	^=	*/
		BitwiseAndAssign,		/*	&=	*/
		BitwiseOrAssign,		/*	|=	*/
		Modulo,					/*	%	*/
		Assign,					/*	=	*/
		Equals,					/*	==	*/
		LessThanOrEqual,		/*	<=	*/
		GreaterThanOrEqual,		/*	>=	*/
		NotEqual,				/*	!=	*/
		Not,					/*	!	*/
		LessThan,				/*	<	*/
		GreaterThan,			/*	>	*/
		Comparison,				/* <==> */
		Negate,					/*	~	*/
		DeclareAssign,			/*	:=	*/
		DeclareCompare,			/*	:== */
		DeclarePropertyAssign,	/*	::= */
		Conditional,			/*	?	*/
		Range,					/*	..	*/
		ReturnType,				/*	->	*/
		DoubleArrow,			/*	=>	*/
	}
}