//
// A class full of computer science classics.
// It's also full of pointless comments for testing purposes.
//
Classics: class {
	// Calculates the n:th fibonacci number
	fibonacci_1: static func(n: Int) -> Int { /* this returns an Int! */
		// if n < 2, just return n
		if(n < 2)
			return n // return n unmolested
		else /* calculate */
			return This fibonacci_1(n - 1) + This fibonacci_1(n - 2) // <-- recursive love!
	} /* fibonacci ends here */

	// A one-liner version
	fibonacci_2: static func(n: Int) -> Int {
		return n < 2 ? n : This fibonacci_2(n - 1) + This fibonacci_2(n - 2)
	}

} /* class ends here */

fib: Int = Classics fibonacci_2(10)
"%d" printfln(fib)

// Testing source line break
testSourceLineBreak: Int = \
	Classics fibonacci_2(10)
"Fib result = %d" printfln(fib)