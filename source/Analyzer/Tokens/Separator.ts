import Token from './Token';
import Comma from './Comma';
/*import Colon from './Colon';
import RightParenthesis from './RightParenthesis';
import LeftParenthesis from './LeftParenthesis';
import RightBracket from './RightBracket';
import LeftBracket from './LeftBracket';
import RightBrace from './RightBrace';
import LeftBrace from './LeftBrace';*/

export default class Separator extends Token {
	
	private static separators = new Array<string>(",", ":", "(", ")", "{", "}", "[", "]");

	static resolve(value: string) {
		var separator: Separator;
		var t = new Token("asdf");
		//var c: Comma = new Comma();
		
		/*switch(value) {
			case ",":
				separator = new Comma();
				break;
			case ":":
				separator = new Colon();
				break;
			case "(":
				separator = new LeftParenthesis();
				break;
			case ")":
				separator = new RightParenthesis();
				break;
			case "{":
				separator = new LeftBrace();
				break;
			case "}":
				separator = new RightBrace();
				break;
			case "[":
				separator = new LeftBracket();
				break;
			case "]":
				separator = new RightBracket();
				break;
			default:
				throw new Error("Invalid separator");
		}*/
		return separator;
	}

	static isSeparator(value: string) {
		return Separator.separators.indexOf(value) > -1;
	}
}