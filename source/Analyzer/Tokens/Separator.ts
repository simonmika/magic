import Token from './Token';

export default class Separator extends Token {
	
	private static separators = new Array<string>("(", ")", "{", "}", "[", "]", ",", ";");
	
	static isSeparator(value: string) {
		return Separator.separators.indexOf(value) > -1;
	}
}