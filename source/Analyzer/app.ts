import Scanner from './Tokens/Scanner';

var sourceString = "//Compute something using i\nfor(i in 1..10) {\n\tcompute(i);\n}";
var scanner = new Scanner(sourceString);

console.log(sourceString);
