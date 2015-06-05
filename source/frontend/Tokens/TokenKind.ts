enum TokenKind
{
	Eof,
	Comment,
	Identifier,
	Keyword,
	/* insert keywords here */
	SeparatorColon,
	SeparatorComma,
	SeparatorLeftBrace,
	SeparatorLeftBracket,
	SeparatorLeftParanthesis,
	SeparatorRightBrace,
	SeparatorRightBracket,
	SeparatorRightParanthesis,
	Operator,
	/* insert operators here */
	LiteralFloat,
	LiteralInteger,
	LiteralString,
	WhitespaceNull,
	WhitespaceTab,
	WhitespaceLineFeed,
	WhitespaceCarriageReturn,
	WhitespaceSpace
}

export = TokenKind;