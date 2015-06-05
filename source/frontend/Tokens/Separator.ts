import Token = require("./Token");
import Colon = require('./Colon');
import Comma = require('./Comma');
import LeftParanthesis = require('./LeftParanthesis');
import LeftBracket = require('./LeftBracket');
import LeftBrace = require('./LeftBrace');
import RightParanthesis = require('./RightParanthesis');
import RightBracket = require('./RightBracket');
import RightBrace = require('./RightBrace');

//
// Note: all 'derived' separator classes must currently still
// inherit from Token instead of from this class, since Node is
// per definition unable to handle circular dependencies.
//
class Separator/* extends Token*/
{
	private static separators = new Array<string>(
		",",
		":",
		"(",
		")",
		"{",
		"}",
		"[",
		"]"
	);
	
	public static create(separator: string) {
		var result: Token;
		switch(separator) {
			case ",":
				result = new Comma();
				break;
			case ":":
				result = new Colon();
				break;
			case "(":
				result = new LeftParanthesis();
				break;
			case ")":
				result = new RightParanthesis();
				break;
			case "{":
				result = new LeftBrace();
				break;
			case "}":
				result = new RightBrace();
				break;
			case "[":
				result = new LeftBracket();
				break;
			case "]":
				result = new RightBracket();
				break;
			default:
				throw new Error("-> Unknown separator '" + separator + "'");
		}
		return result;
	}
	
	public static isSeparator(separator: string) {
		return Separator.separators.indexOf(separator) > -1;
	}	
}

export = Separator;