//
// A class full of computer science classics.
// It's also full of pointless comments for testing purposes.
//
Classics: class {
    // Calculates the n:th fibonacci number
    fibonacci: static func(n: Int) -> Int { /* this returns an Int! */
        // if n < 2, just return n
        if(n < 2)
            return n // just return n unmolested
        else /* calculate */
            return This fibonacci(n - 1) + This fibonacci(n - 2) // <-- recursive love!
    } /* fibonacci ends here */
} /* class ends here */

fib: Int = Classics fibonacci(2)
"%d" printfln(fib)
