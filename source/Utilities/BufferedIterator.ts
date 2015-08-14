/// <reference path="Iterator" />

module Magic.Utilities {
	export class BufferedIterator<T> implements Iterator<T> {
		_buffer: T[]
		constructor(private _backend: Iterator<T>) {
		}
		peek(position: number = 0): T {
			var next: T = null
			while (position > this._buffer.length - 1 && (next = this._backend.next())) {
				this._buffer.push(next)
			}
			return position > this._buffer.length - 1 ? null : this._buffer[position]
		}
		next(): T {
			var result = this.peek(0)
			if (this._buffer.length > 1) {
				this._buffer.slice()
			}
			return result
		}
	}
}
