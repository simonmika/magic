// Code starts with incorrect indentation
	fibonacci_1: static func( n: Int) -> Int {
		// too many spaces
		if ( n < 2 )
			// incorrect indentation
				return n
		else /* calculate */
			return This fibonacci_1(n - 1) + This fibonacci_1(n - 2) // <-- recursive love!
	}