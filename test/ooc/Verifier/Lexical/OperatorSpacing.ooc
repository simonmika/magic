// Nothing in this file should cause a violation
add: func (a, b: Int) -> Int { a + b }
sub: func (a, b: Int) -> Int { a - b }
mul: func (a, b: Int) -> Int { a * b }
div: func (a, b: Int) -> Int { a / b }
pow: func (a, b: Int) -> Int { a**b }
neg: func (a: Int) -> Int { -a }
not: func ~binary (a: Int) -> Int { ~a }
not: func ~logical (a: Bool) -> Bool { !a }
foobar: func ~int (a, b: Int) { not(-a + b) }
foobar: func ~float (a, b: Float) { not((a as Int) + (b as Int)) }
isSomething?: func -> Bool { false }

a := not~binary(10)
