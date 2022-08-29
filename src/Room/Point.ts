'use strict'

import {
	draw,
	roomSize
} from './Constants';
import MoorNeighbourhood from './MoorNeighbourhood';
import Room from './Room';

/**
 * Point
 * @ignore
 */
export default class Point {
	readonly room: Room;
	readonly x: number;
	readonly y: number;
	readonly v: number | undefined;
	static _border?: Point;

	constructor(room: Room, x: number, y: number, v: number | undefined) {
		this.room = room;
		this.x = x;
		this.y = y;
		this.v = v;
	}

	static get border(): Point {
		if (!this._border) {
			this._border = new Point(new Room(""), -1, -1, undefined)
		}

		return this._border
	}

	getNeighbourhood() {
		return MoorNeighbourhood.getNeighbourhood(this);
	}

	get edge(): boolean {
		return this.x === 0 || this.x === roomSize - 1
			|| this.y === 0 || this.y === roomSize - 1
	}

	get border(): boolean {
		return this.v === draw.border
	}

	get clear(): boolean {
		return this.v === draw.clear
	}

	get wall(): boolean {
		return this.v === draw.wall
	}

	get swamp(): boolean {
		return this.v === draw.swamp
	}

	get both(): boolean {
		return this.v === draw.both
	}

	isDrawn(type: number | undefined): boolean {
		return this.both || this.v === type
	}
}