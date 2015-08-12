/// <reference path="Rule" />
/// <reference path="../../frontend/Token" />
/// <reference path="../../frontend/TokenKind" />
/// <reference path="../Report" />
/// <reference path="../Violation" />
/// <reference path="../RuleKind" />

// (x: Float, y: Float, z: Float)

class RedundantTypeInfoRule implements Rule {
	constructor() { }
	run(tokens: Token[], report: Report) {
		for (var i = 0; i < tokens.length; i++) {
			if (tokens[i].kind == TokenKind.KeywordFunc) {
				while (tokens[i].kind != TokenKind.Eof && tokens[i].kind != TokenKind.WhitespaceLineFeed) {
					if (tokens[i].kind == TokenKind.SeparatorLeftParanthesis) {
						i++;
						var nextIsType = false;
						var idents: string[] = [];
						var types: string[] = [];
						while (tokens[i].kind != TokenKind.SeparatorRightParanthesis) {
							if (tokens[i].kind == TokenKind.Identifier || tokens[i].kind == TokenKind.VarArgs) {
								if (nextIsType) {
									types.push(tokens[i].value);
								} else {
									idents.push(tokens[i].value);
								}
								nextIsType = nextIsType ? false : true;
							}
							i++;
						}
						var same = true;
						types.forEach(t => {
							if (t !== types[0]) {
								same = false;
							}
						});
						if (same && types.length > 1) {
							var id = "";
							for (var k = 0; k < idents.length - 1; k++) {
								id += idents[k] + ", ";
							}
							id += idents[idents.length - 1];
							var message = "redundant type information, reduce to (" + id + ": " + types[0] + ")";
							report.addViolation(new Violation(tokens[i].location, message, RuleKind.General));
						}
						break;
					}
					i++;
				}
			}
		}
	}
}
