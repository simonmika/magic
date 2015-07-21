enum TokenKind {
	Unknown,
	Eof,
	LineComment,
	BlockComment,
	Identifier,
	Datatype,
	// Keywords
	Keyword,
	KeywordOnHeap,
	KeywordThis,
	KeywordStaticThis,
	KeywordVirtual,
	KeywordOverride,
	KeywordBreak,
	KeywordContinue,
	KeywordReturn,
	KeywordFunc,
	KeywordClass,
	KeywordCover,
	KeywordEnum,
	KeywordInterface,
	KeywordFrom,
	KeywordAbstract,
	KeywordFinal,
	KeywordStatic,
	KeywordInline,
	KeywordExtends,
	KeywordExtern,
	KeywordUnmangled,
	KeywordImplements,
	KeywordImplicit,
	KeywordImport,
	KeywordInclude,
	KeywordUse,
	KeywordIf,
	KeywordElse,
	KeywordFor,
	KeywordWhile,
	KeywordMatch,
	KeywordCase,
	KeywordAs,
	KeywordIn,
	KeywordInto,
	KeywordProto,
	KeywordTry,
	KeywordCatch,
	KeywordSet,
	KeywordGet,
	KeywordOperator,
	KeywordConst,
	KeywordTrue,
	KeywordFalse,
	KeywordNull,
	// Separators
	Separator,
	SeparatorColon,					/*	:	*/
	SeparatorComma,					/*	,	*/
	SeparatorLeftCurly,				/*	{	*/
	SeparatorLeftBracket,			/*	[	*/
	SeparatorLeftParanthesis,		/*	(	*/
	SeparatorRightCurly,			/*	}	*/
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
	OperatorBitwiseXor,				/*	^	*/
	OperatorBitwiseAnd,				/*	&	*/
	OperatorBitwiseOr,				/*	|	*/
	OperatorLogicalOr,				/*	||	*/
	OperatorLogicalAnd,				/*	&&	*/
	OperatorAddAssign,				/*	+=	*/
	OperatorSubtractAssign,			/*	-*	*/
	OperatorMultiplyAssign,			/*	*=	*/
	OperatorDivideAssign,			/*	/=	*/
	OperatorExponentAssign,			/*	**=	*/
	OperatorLeftShiftAssign,		/*	<<=	*/
	OperatorRightShiftAssign,		/*	>>=	*/
	OperatorBitwiseXorAssign,		/*	^=	*/
	OperatorBitwiseAndAssign,		/*	&=	*/
	OperatorBitwiseOrAssign,		/*	|=	*/
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
	OperatorNegate,					/*	~	*/
	OperatorDeclareAssign,			/*	:=	*/
	OperatorDeclareCompare,			/*	:== */
	OperatorDeclarePropertyAssign,	/*	::= */
	OperatorConditional,			/*	?	*/
	OperatorRange,					/*	..	*/
	OperatorReturnType,				/*	->	*/
	// Literals
	LiteralNumber,
	LiteralFloat,
	LiteralInteger,
	LiteralString,
	LiteralBoolean,
	// Whitespaces
	WhitespaceNull,
	WhitespaceTab,
	WhitespaceLineFeed,
	WhitespaceCarriageReturn,
	WhitespaceSpace,
}

export = TokenKind;