/// <reference path="../Source" />
/// <reference path="../../Tokens/Token" />
/// <reference path="../../Tokens/Identifier" />
/// <reference path="../../Tokens/Separator" />
/// <reference path="../../Tokens/Substance" />
/// <reference path="../Statement" />
/// <reference path="../Declaration" />
/// <reference path="../Type/Identifier" />
/// <reference path="../Type/Name" />
/// <reference path="Argument" />
/// <reference path="../Block" />
/// <reference path="../../Utilities/Iterator" />
/// <reference path="../../Utilities/ArrayIterator" />
/// <reference path="FunctionModifier" />


module Magic.SyntaxTree.Declarations {
	export class Function extends Declaration {
		constructor(symbol: Type.Name, private modifier: FunctionModifier, private typeParameters: Type.Name[], private argumentList: Argument[], private returnType: Type.Expression, private body: Block, tokens: Tokens.Substance[]) {
			super(symbol.getName(), tokens)
		}
		getModifier(): FunctionModifier {
			return this.modifier
		}
		getTypeParameters(): Utilities.Iterator<Type.Name> {
			return new Utilities.ArrayIterator(this.typeParameters)
		}
		getReturnType(): Type.Expression {
			return this.returnType
		}
		getBody(): Block {
			return this.body
		}
		getArguments(): Utilities.Iterator<Argument> {
			return new Utilities.ArrayIterator(this.argumentList)
		}
		static parse(source: Source): Function {
			var result: Function
			if (source.peek(0).isIdentifier() && source.peek(1).isSeparator(":") && (source.peek(2).isIdentifier("func") || source.peek(3).isIdentifier("func"))) {
				var symbol = Type.Name.parse(source.clone())
				var modifier = FunctionModifier.None
				source.next() // consume ":"
				if (!source.peek().isIdentifier("func")) {
					switch ((<Tokens.Identifier>source.peek()).getName()) {
						case "static":
							modifier = FunctionModifier.Static
							break
						case "abstract":
							modifier = FunctionModifier.Abstract
							break
						case "virtual":
							modifier = FunctionModifier.Virtual
							break;
						case "override":
							modifier = FunctionModifier.Override
							break
						default:
							source.raise("Invalid modifier.", Error.Level.Critical)
					}
					source.next() // consume modifier
				}
				source.next() // consume "func"
				// TODO: add overload name parsing: ~overloadName
				var typeParameters = Declaration.parseTypeParameters(source)
				var argumentList = Argument.parseAll(source)
				var returnType: Type.Expression
				if (source.peek().isOperator("->")) {
					source.next() // consume "->"
					returnType = Type.Expression.parse(source)
				}
				var body = Block.parse(source)
				result = new Function(symbol, modifier, typeParameters, argumentList, returnType, body, source.mark())
			}
			return result
		}
	}
	Statement.addParser(Function.parse)
}
