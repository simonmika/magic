/// <reference path="Iterator" />

module Magic.Utilities {
	export class BufferedIterator<T> implements Iterator<T> {
		_buffer: T[]
		constructor(private _backend: Iterator<T>) {
		}
		peek(position: number = 0): IteratorResult<T> {
			var next: IteratorResult<T> = { done: true }
			while (position > this._buffer.length - 1 && !(next = this._backend.next()).done) {
				this._buffer.push(next.value)
			}
			return position > this._buffer.length - 1 ? { done: true } : { done: false, value: this._buffer[position] }
		}
		next(): IteratorResult<T> {
			var result = this.peek(0)
			if (this._buffer.length > 1) {
				this._buffer.slice()
			}
			return result
		}
	}
}
