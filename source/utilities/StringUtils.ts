class StringUtils {
	static padLeft(str: string, padChar: string, width: number) {
		return StringUtils.pad(str, padChar, width, true);
	}
	static padRight(str: string, padChar: string, width: number) {
		return StringUtils.pad(str, padChar, width, false);
	}
	private static pad(str: string, padChar: string, width: number, padLeft = false) {
		var padding = "";
		var n = width - str.length;
		for (var i = 0; i < n; i++) {
			padding += padChar;
		}
		return padLeft ? padding + str : str + padding;
	}
	static subStringCount(source: string, substr: string) {
		var i = 0;
		var count = 0;
		var index = 0;
		while ((i = source.indexOf(substr, index)) > -1) {
			index = i + substr.length;
			count++;
		}
		return count;
	}
}

export = StringUtils;