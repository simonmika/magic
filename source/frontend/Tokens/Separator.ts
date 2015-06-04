import Token = require("./Token");
import DotDot = require("./DotDot");

//
// Note: all 'derived' separator classes must currently still
// inherit from Token instead of from this class, since Node is
// per definition unable to handle circular dependencies.
//
class Separator extends Token
{
	private static separators = new Array<string>(
		",",
		":",
		"(",
		")",
		"{",
		"}",
		"[",
		"]",
		".."
	);
	
	public static create(separator: string) {
		return new DotDot();
	}
	
	public static isSeparator(separator: string) {
		return Separator.separators.indexOf(separator);
	}	
}

export = Separator;