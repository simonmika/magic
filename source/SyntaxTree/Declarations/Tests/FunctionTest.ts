/// <reference path="../../../Error/ConsoleHandler" />
/// <reference path="../../../Error/Position" />
/// <reference path="../../../Error/Location" />
/// <reference path="../../../Error/Region" />
/// <reference path="../../../IO/BufferedReader" />
/// <reference path="../../../IO/StringReader" />
/// <reference path="../../../Tokens/Lexer" />
/// <reference path="../../../Tokens/GapRemover" />
/// <reference path="../../../Unit/Fixture" />
/// <reference path="../../../Unit/Constraints/Is" />
/// <reference path="../../Parser" />
/// <reference path="../../Module" />
/// <reference path="../../Declarations/Function" />
/// <reference path="../../Type/Identifier" />
/// <reference path="../../Type/Tuple" />

module Magic.SyntaxTree.Tests {
	import Is = Unit.Constraints.Is
	export class FunctionTest extends Unit.Fixture {
		constructor() {
			super("SyntaxTree.Declarations.Function")
			var handler = new Error.ConsoleHandler()
			//
			// TODO: Construct a test for an argument list with no explicitly set types (type inference)
			//
			this.add("empty function", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("Empty: func\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var functionDeclaration = <Declarations.Function> statements.next()
				this.expect(functionDeclaration.getSymbol(), Is.Equal().To("Empty"))
			})
			this.add("empty function with parameters", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("Empty: func (i: Int, j: Float, k: Double)\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var functionDeclaration = <Declarations.Function> statements.next()
				var functionArguments = functionDeclaration.getArguments()
				var currentArgument: Declarations.Argument
				this.expect(functionDeclaration.getSymbol(), Is.Equal().To("Empty"))
				currentArgument = functionArguments.next()
				this.expect(currentArgument.getSymbol(), Is.Equal().To("i"))
				this.expect((<Type.Identifier>currentArgument.getType()).getName(), Is.Equal().To("Int"))
				currentArgument = functionArguments.next()
				this.expect(currentArgument.getSymbol(), Is.Equal().To("j"))
				this.expect((<Type.Identifier>currentArgument.getType()).getName(), Is.Equal().To("Float"))
				currentArgument = functionArguments.next()
				this.expect(currentArgument.getSymbol(), Is.Equal().To("k"))
				this.expect((<Type.Identifier>currentArgument.getType()).getName(), Is.Equal().To("Double"))
			})
			this.add("empty function with parameters reduced", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("Empty: func (w, h: Int, x, y, z: Float)\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var functionDeclaration = <Declarations.Function> statements.next()
				var functionArguments = functionDeclaration.getArguments()
				var currentArgument: Declarations.Argument
				this.expect(functionDeclaration.getSymbol(), Is.Equal().To("Empty"))
				currentArgument = functionArguments.next()
				this.expect(currentArgument.getSymbol(), Is.Equal().To("w"))
				this.expect((<Type.Identifier>currentArgument.getType()).getName(), Is.Equal().To("Int"))
				currentArgument = functionArguments.next()
				this.expect(currentArgument.getSymbol(), Is.Equal().To("h"))
				this.expect((<Type.Identifier>currentArgument.getType()).getName(), Is.Equal().To("Int"))
				currentArgument = functionArguments.next()
				this.expect(currentArgument.getSymbol(), Is.Equal().To("x"))
				this.expect((<Type.Identifier>currentArgument.getType()).getName(), Is.Equal().To("Float"))
				currentArgument = functionArguments.next()
				this.expect(currentArgument.getSymbol(), Is.Equal().To("y"))
				this.expect((<Type.Identifier>currentArgument.getType()).getName(), Is.Equal().To("Float"))
				currentArgument = functionArguments.next()
				this.expect(currentArgument.getSymbol(), Is.Equal().To("z"))
				this.expect((<Type.Identifier>currentArgument.getType()).getName(), Is.Equal().To("Float"))
			})
			this.add("empty generic function with generic parameter types", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("Empty: func <T, S> (a, b: Generic<T>, x, y: Generic<S>)\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var functionDeclaration = <Declarations.Function> statements.next()
				var typeParameters = functionDeclaration.getTypeParameters()
				var functionArguments = functionDeclaration.getArguments()
				var currentArgument = functionArguments.next()
				this.expect(typeParameters.next().getName(), Is.Equal().To("T"))
				this.expect(typeParameters.next().getName(), Is.Equal().To("S"))
				this.expect((<Type.Identifier>currentArgument.getType()).getTypeParameters().next().getName(), Is.Equal().To("T"))
				functionArguments.next() // consume "b: Generic<T>"
				currentArgument = functionArguments.next()
				this.expect((<Type.Identifier>currentArgument.getType()).getTypeParameters().next().getName(), Is.Equal().To("S"))
			})
			this.add("empty function with return type", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("Empty: func -> ReturnType\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var functionDeclaration = <Declarations.Function> statements.next()
				this.expect(functionDeclaration.getSymbol(), Is.Equal().To("Empty"))
				this.expect((<Type.Identifier>functionDeclaration.getReturnType()).getName(), Is.Equal().To("ReturnType"))
			})
			this.add("empty function with return type tuple", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("Empty: func -> (Int, Float, Double)\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var functionDeclaration = <Declarations.Function> statements.next()
				var tupleChildren = (<Type.Tuple>functionDeclaration.getReturnType()).getChildren()
				this.expect(functionDeclaration.getSymbol(), Is.Equal().To("Empty"))
				this.expect((<Type.Identifier>tupleChildren.next()).getName(), Is.Equal().To("Int"))
				this.expect((<Type.Identifier>tupleChildren.next()).getName(), Is.Equal().To("Float"))
				this.expect((<Type.Identifier>tupleChildren.next()).getName(), Is.Equal().To("Double"))
			})
		}
	}
	Unit.Fixture.add(new FunctionTest())
}
