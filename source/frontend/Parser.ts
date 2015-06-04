import fs = require("fs");

import Lexer = require("./Lexer");
import ParseTree = require("./ParseTree");

class Parser
{
	private lexer: Lexer;
	
	Parse(filename: string) : ParseTree {		
		return null;
	}
}

export = Parser;