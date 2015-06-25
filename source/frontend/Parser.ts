import fs = require("fs");

import Lexer = require("./Lexer");
import Token = require("./Token");
import TokenKind = require("./TokenKind");

class Parser
{
	constructor(private sourceFile: string) {}
}

export = Parser;