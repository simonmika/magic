// Includes some stuff that may cause the lexer to trip up.

import mathlib
use base-math
import ../Foo/Bar

FancyVectorStuff: class extends VectorStuff {

	_vector3D: Vector3D
	_settings: VectorSettings
	
	init: func (=_vector3D, =_settings) {
		super()
		if (this _settings newVector)
			_vector3D = Vector3D new()
		else
			_vector3D = _vector3D randomize()
	}
	
	reset: override func {
		this _vector3D reset()
	}
	
	test: func(foo, bar, index) -> Float {
		factor:=1.95285214f
		temp := -foo+bar[index-1]
		return (bar* factor) / temp
	}	
}
