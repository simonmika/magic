import TokenKind = require("./TokenKind");

class Datatype
{
	private static datatypes: { [key: string]: TokenKind; } = {
		"Char": TokenKind.Datatype,
		"UChar": TokenKind.Datatype,
		"Short": TokenKind.Datatype,
		"UShort": TokenKind.Datatype,
		"Int": TokenKind.Datatype,
		"UInt": TokenKind.Datatype,
		"Long": TokenKind.Datatype,
		"ULong": TokenKind.Datatype,
		"LLong": TokenKind.Datatype,
		"ULLong": TokenKind.Datatype,
		"Int8": TokenKind.Datatype,
		"UInt8": TokenKind.Datatype,
		"Int16": TokenKind.Datatype,
		"UInt16": TokenKind.Datatype,
		"Int32": TokenKind.Datatype,
		"UInt32": TokenKind.Datatype,
		"Int64": TokenKind.Datatype,
		"UInt64": TokenKind.Datatype,
		"Float": TokenKind.Datatype,
		"Double": TokenKind.Datatype,
		"LDouble": TokenKind.Datatype,
		"String": TokenKind.Datatype
	};
		
	static isDatatype(datatype: string) {
		return Datatype.toKind(datatype) !== TokenKind.Unknown;
	}
	
	static toString(datatype: TokenKind) {
		var result: string = null;
		for(var key in Datatype.datatypes) {
			if(Datatype.datatypes[key] == datatype) {
				result = key;
			}
		}
		return result;
	}
	
	static toKind(datatype: string) {
		var result = Datatype.datatypes[datatype];
		return result === undefined ? TokenKind.Unknown : result;
	}
}

export = Datatype;