import Lexer from './Tokens/Lexer';
import Scanner from './Tokens/Scanner';

var sourceString = "for(i in 1..10) {\n\tcompute(i);\n}";
var sourceStringComment = "//Compute something using i\nfor(i in 1..10) {\n\tcompute(i);\n}";

var lexer = new Lexer(sourceString);
var scanner = new Scanner("abc");

console.log(scanner.peek());
scanner.skip();
console.log(scanner.peek());
scanner.skip();
console.log(scanner.peek());
scanner.skip();
console.log(scanner.peek());



/*while(scanner.hasNext()) {
	console.log(scanner.getNext());
}*/
