interface Expression
{
	getPrecedence(): number;
	toString(): string;
}

export = Expression;