Foobar: class {
	// Missing space before and after keyword
	foo:extern(foo) func (Float) -> Float
	// in? should not trigger a missing-space violation here
	in?: func { }
	p1: Float { get { 0.0f } }
}