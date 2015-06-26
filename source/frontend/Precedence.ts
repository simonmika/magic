class Precedence 
{
	public static Zero = 0;
	public static Range = 10;
	public static Assignment = 20
	public static Comparison = 40;
	public static Conditional = 60;
	public static Bitwise = 80;
	public static Logical = 80;
	public static Sum = 100;
	public static Product = 120;
	public static Exponent = 140;
	public static Prefix = 160;
	public static Postfix = 180;
	public static FunctionCall = 200;
	public static Whitespace = 8192;
}

export = Precedence;