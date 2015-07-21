class StringUtils
{
	static padLeft(str: string, padChar: string, width: number) {
		return StringUtils.pad(str, padChar, width, true);
	}
	static padRight(str: string, padChar: string, width: number) {
		return StringUtils.pad(str, padChar, width, false);
	}
	private static pad(str: string, padChar: string, width: number, padLeft = false) {
		var padding = "";
		var n = width - str.length;
		for(var i = 0; i < n; i++) {
			padding += padChar;
		}
		return padLeft ? padding + str : str + padding;
	}
}

export = StringUtils;