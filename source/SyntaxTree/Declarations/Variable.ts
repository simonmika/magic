/// <reference path="../Source" />
/// <reference path="../../Tokens/Token" />
/// <reference path="../../Tokens/Identifier" />
/// <reference path="../../Tokens/Separator" />
/// <reference path="../../Tokens/Substance" />
/// <reference path="../Statement" />
/// <reference path="../Declaration" />
/// <reference path="../Type/Name" />
/// <reference path="../../Error/Level" />
/// <reference path="../../Error/Type" />

module Magic.SyntaxTree.Declarations {
	export class Variable extends Declaration {
		constructor(private name: Type.Name, private static_: boolean, private constant: boolean, private type: Type.Expression, tokens: Tokens.Substance[]) {
			super(name.getName(), tokens)
		}
		isStatic(): boolean {
			return this.static_
		}
		isConstant(): boolean {
			return this.constant
		}
		getType(): Type.Expression {
			return this.type
		}
		static parse(source: Source): Variable {
			var result: Variable
			if (source.peek().isIdentifier() && source.peek(1).isSeparator(":")) {
				var name = Type.Name.parse(source.clone())
				source.next() // consume ":"
				var done = false
				var isStatic = false
				var isConstant = false
				while (!done && source.peek().isIdentifier()) {
					switch ((<Tokens.Identifier>source.peek()).getName()) {
						case "static":
							if (isStatic)
								source.raise("Multiple static keywords.", Error.Level.Recoverable)
							isStatic = true
							source.next() // consume "static"
							break
						case "const":
							if (isConstant)
								source.raise("Multiple const keywords.", Error.Level.Recoverable)
							isConstant = true
							source.next() // consume "const"
							break
						default:
							done = true
							break;
					}
				}
				var type = Type.Expression.parse(source.clone())
				result = new Variable(name, isStatic, isConstant, type, source.mark())
			}
			return result
		}
	}
	Statement.addParser(Variable.parse)
}
