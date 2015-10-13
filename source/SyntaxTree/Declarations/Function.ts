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

module Magic.SyntaxTree.Declarations {
	export class Function extends Declaration {
		constructor(symbol: Type.Name, private typeParameters: Type.Name[], private argumentList: Argument[], private returnType: Type.Expression, private body: Block, tokens: Tokens.Substance[]) {
			super(symbol.getName(), tokens)
		}
		getTypeParameters(): Type.Name[] {
			return this.typeParameters
		}
		getReturnType(): Type.Expression {
			return this.returnType
		}
		getBody(): Block {
			return this.body
		}
		getArguments(): Argument[] {
			return this.argumentList
		}
		static parse(source: Source): Function {
			var result: Function
			// TODO: add support for modifiers: override, virtual, abstract, static
			if (source.peek(0).isIdentifier() && source.peek(1).isSeparator(":") && (source.peek(2).isIdentifier("func") || source.peek(3).isIdentifier("func"))) {
				var symbol = Type.Name.parse(source.clone())
				source.next() // consume ":"
				if (!source.peek().isIdentifier("func"))
					source.next() // TODO: <-- this is the modifier
				source.next() // consume "func"
				// TODO: add overload name parsing: ~overloadName
				var typeParameters = Declaration.parseTypeParameters(source)
				var argumentList = Argument.parseAll(source)
				var returnType: Type.Expression
				if (source.peek().isOperator("->")) {
					source.next() // consume "->"
					returnType = Type.Expression.parse(source) // Why is the return type an Expression?
				}
				var body = Block.parse(source)
				result = new Function(symbol, typeParameters, argumentList, returnType, body, source.mark())
			}
			return result
		}
	}
	Statement.addParser(Function.parse)
}
