enum TokenKind
{
	Eof,
	Comment,
	Identifier,
	Keyword,
	/* Insert keywords here? */
	// Separators
	SeparatorColon,					/*	:	*/
	SeparatorComma,					/*	,	*/
	SeparatorLeftBrace,				/*	{	*/
	SeparatorLeftBracket,			/*	[	*/
	SeparatorLeftParanthesis,		/*	(	*/
	SeparatorRightBrace,			/*	}	*/
	SeparatorRightBracket,			/*	]	*/
	SeparatorRightParanthesis,		/*	)	*/
	// Operators
	Operator,
	OperatorDereference,			/*	@	*/
	OperatorAdd,					/*  + 	*/
	OperatorSubtract,				/*  - 	*/
	OperatorMultiply,				/*  * 	*/
	OperatorDivide,					/*  / 	*/
	OperatorExponent,				/*	**	*/			
	OperatorLeftShift,				/*	<<	*/
	OperatorRightShift,				/*	>>	*/
	OperatorBinaryXor,				/*	^	*/
	OperatorBinaryAnd,				/*	&	*/
	OperatorBinaryOr,				/*	|	*/
	OperatorLogicalOr,				/*	||	*/
	OperatorLogicalAnd,				/*	&&	*/
	OperatorAddAssign,				/*	+=	*/
	OperatorSubtractAssign,			/*	-*	*/
	OperatorMultiplyAssign,			/*	*=	*/
	OperatorDivideAssign,			/*	/=	*/
	OperatorExponentAssign,			/*	**=	*/
	OperatorLeftShiftAssign,		/*	<<=	*/
	OperatorRightShiftAssign,		/*	>>=	*/
	OperatorBinaryXorAssign,		/*	^=	*/
	OperatorBinaryAndAssign,		/*	&=	*/
	OperatorBinaryOrAssign,			/*	|=	*/
	OperatorModulo,					/*	%	*/
	OperatorAssign,					/*	=	*/
	OperatorEquals,					/*	==	*/
	OperatorLessThanOrEqual,		/*	<=	*/
	OperatorGreaterThanOrEqual,		/*	>=	*/
	OperatorNotEqual,				/*	!=	*/
	OperatorNot,					/*	!	*/
	OperatorLessThan,				/*	<	*/
	OperatorGreaterThan,			/*	>	*/
	OperatorComparison,				/* <==> */
	OperatorNegation,				/*	~	*/
	OperatorDeclareAssign,			/*	:=	*/
	OperatorDeclareCompare,			/*	:== */
	OperatorDeclareCreateGetter,	/*	::= */
	// Literals
	LiteralFloat,
	LiteralInteger,
	LiteralString,
	// Whitespaces
	WhitespaceNull,
	WhitespaceTab,
	WhitespaceLineFeed,
	WhitespaceCarriageReturn,
	WhitespaceSpace
}

export = TokenKind;