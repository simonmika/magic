import Token = require("./Token");
import IntegerLiteral = require("./IntegerLiteral");
import FloatLiteral = require("./FloatLiteral");

class NumericLiteral /* extends Token */
{
	//
	// Maybe we should always use this class for numeric literals
	// since Node breaks down under certain circumstances when
	// there are circular dependencies?
	//
	// It'd be much cleaner since we could set a simple flag to 
	// indicate if it's a float or not.
	//
	static create(literal: string) {
		return literal.indexOf(".") > -1
			? new FloatLiteral(parseFloat(literal))
			: new IntegerLiteral(parseInt(literal));
	}
	
	static isFloat(literal: string) {
		return literal.indexOf(".") > -1;
	}
}

export = NumericLiteral;
