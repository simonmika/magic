/// <reference path="./../../frontend/Token" />
/// <reference path="./../Report" />

//
// TODO: The analyzer should not work with a list of tokens.
// Instead, it should work with a proper parse tree. This is just
// temporary.
//
interface Rule {
	run(tokens: Token[], report: Report): void;
}
