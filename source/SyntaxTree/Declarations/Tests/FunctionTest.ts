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
				this.expect(functionDeclaration.getSymbol(), Is.Equal().To("Empty"))
				this.expect(functionArguments[0].getSymbol(), Is.Equal().To("i"))
				this.expect((<Type.Identifier>functionArguments[0].getType()).getName(), Is.Equal().To("Int"))
				this.expect(functionDeclaration.getArguments()[1].getSymbol(), Is.Equal().To("j"))
				this.expect((<Type.Identifier>functionArguments[1].getType()).getName(), Is.Equal().To("Float"))
				this.expect(functionDeclaration.getArguments()[2].getSymbol(), Is.Equal().To("k"))
				this.expect((<Type.Identifier>functionArguments[2].getType()).getName(), Is.Equal().To("Double"))
			})
			this.add("empty function with parameters reduced", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("Empty: func (w, h: Int, x, y, z: Float)\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var functionDeclaration = <Declarations.Function> statements.next()
				var functionArguments = functionDeclaration.getArguments()
				this.expect(functionDeclaration.getSymbol(), Is.Equal().To("Empty"))
				this.expect(functionArguments[0].getSymbol(), Is.Equal().To("w"))
				this.expect((<Type.Identifier>functionArguments[0].getType()).getName(), Is.Equal().To("Int"))
				this.expect(functionArguments[1].getSymbol(), Is.Equal().To("h"))
				this.expect((<Type.Identifier>functionArguments[1].getType()).getName(), Is.Equal().To("Int"))
				this.expect(functionArguments[2].getSymbol(), Is.Equal().To("x"))
				this.expect((<Type.Identifier>functionArguments[2].getType()).getName(), Is.Equal().To("Float"))
				this.expect(functionArguments[3].getSymbol(), Is.Equal().To("y"))
				this.expect((<Type.Identifier>functionArguments[3].getType()).getName(), Is.Equal().To("Float"))
				this.expect(functionArguments[4].getSymbol(), Is.Equal().To("z"))
				this.expect((<Type.Identifier>functionArguments[4].getType()).getName(), Is.Equal().To("Float"))
			})
			this.add("empty generic function with generic parameter types", () => {
				var parser = new Parser(new Tokens.GapRemover(new Tokens.Lexer(new IO.StringReader("Empty: func <T, S> (a, b: Generic<T>, x, y: Generic<S>)\n"), handler)), handler)
				var statements = parser.next().getStatements()
				var functionDeclaration = <Declarations.Function> statements.next()
				var functionArguments = functionDeclaration.getArguments()
				this.expect(functionDeclaration.getTypeParameters()[0].getName(), Is.Equal().To("T"))
				this.expect((<Type.Identifier>functionArguments[0].getType()).getTypeParameters().next().getName(), Is.Equal().To("T"))
				this.expect(functionDeclaration.getTypeParameters()[1].getName(), Is.Equal().To("S"))
				this.expect((<Type.Identifier>functionArguments[2].getType()).getTypeParameters().next().getName(), Is.Equal().To("S"))
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
				var returnType = <Type.Tuple>functionDeclaration.getReturnType()
				this.expect(functionDeclaration.getSymbol(), Is.Equal().To("Empty"))
				this.expect((<Type.Identifier>(returnType).getChildren()[0]).getName(), Is.Equal().To("Int"))
				this.expect((<Type.Identifier>(returnType).getChildren()[1]).getName(), Is.Equal().To("Float"))
				this.expect((<Type.Identifier>(returnType).getChildren()[2]).getName(), Is.Equal().To("Double"))
			})
		}
	}
	Unit.Fixture.add(new FunctionTest())
}
