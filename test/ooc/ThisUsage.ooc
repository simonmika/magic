Ignored: cover from SomeCover

Foobar: class {
	p: Bool
	f1: func (foobar: Foobar, p: Bool) -> Bool {
		return p
	}
	f2: func (foobar: Foobar, p, p2: Bool) -> Bool {
		return foobar p && (p || p2)
	}
}

Moobar: cover {
	p: Bool
	f1: func (foobar: Moobar, p: Bool) -> Bool {
		return p
	}
	f2: func (foobar: Moobar, p, p2: Bool) -> Bool {
		return foobar p && (p || p2)
	}
}
