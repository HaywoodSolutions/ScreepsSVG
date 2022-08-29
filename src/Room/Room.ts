'use strict'

import Point from './Point';
import {
	roomSize,
	blockAngle,
	blockSize,
	action,
	draw,
	backgroundImage,
} from './Constants';

export default class Room {
	private data: string;

	constructor(data: string) {
		this.data = data;
	}

	static makeSVG(paths: any[], background: boolean = true): string {
		const content = paths.map(path => {
			const attributes = Object.entries(path).map(([key, value]) => `${key}="${value}"`)
			return `<path ${attributes.join(' ')} />`
		})

		const styleText = `style="background: url(${backgroundImage});"`

		return `<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" ${background ? styleText : ''} viewBox="0 0 5000 5000" shape-rendering="optimizeSpeed">${content.join('\n')}</svg>`
	}

	getCoord(x: number, y: number): Point {
		const val = this.data[roomSize * y + x]
		return new Point(this, x, y, Number(val))
	}

	drawRectangle(point: Point, draw: number = 1) {
		const { x, y } = point
		const halfBlock = blockSize / 2

		let content = []
		let current = point
		let end = point
		let moor = current.getNeighbourhood()

		// Move to rect start
		content.push(`${action.move} ${x * blockSize + halfBlock} ${y * blockSize}`)

		// Top Left Corner
		if (moor.pLeft.isDrawn(draw) || moor.pLeft.border || moor.pTop.border) {

			// Curve outward
			if (moor.pTopLeft.isDrawn(draw) && !moor.pTop.isDrawn(draw)) {
				content.push(`${action.arc} ${blockAngle} ${blockAngle} 0 0 1 -${blockAngle} -${blockAngle}`)
				content.push(`${action.down} ${blockSize}`)

				// Sharp
			} else {
				content.push(`${action.right} -${halfBlock}`)
				content.push(`${action.down} ${halfBlock}`)
			}

			// Curve inward
		} else {
			content.push(`${action.arc} ${blockAngle} ${blockAngle} 0 0 0 -${blockAngle} ${blockAngle}`)
		}

		// Draw lines down
		while (true) {
			// Break if nothing below
			const { pBottom } = moor
			if (pBottom.border || !pBottom.isDrawn(draw)) {
				break
			}

			content.push(`${action.down} ${halfBlock}`)

			// Left Side
			const { pLeft, pBottomLeft } = moor
			if (!pBottomLeft.isDrawn(draw) && pLeft.isDrawn(draw)) {
				content.push(`${action.right} -${halfBlock}`)
				content.push(`${action.arc} ${blockAngle} ${blockAngle} 0 0 1 ${blockAngle} ${blockAngle}`)
			} else {
				content.push(`${action.down} ${halfBlock}`)
			}

			// Continue
			current = pBottom
			moor = current.getNeighbourhood()
		}

		end = current

		// Bottom Left Corner
		if (moor.pLeft.isDrawn(draw) || moor.pLeft.border || moor.pBottom.border) {
			// Sharp
			content.push(`${action.down} ${halfBlock}`)
			content.push(`${action.right} ${halfBlock}`)

			// Curve inward
		} else {
			content.push(`${action.arc} ${blockAngle} ${blockAngle} 0 0 0 ${blockAngle} ${blockAngle}`)
		}

		// Bottom Right Corner
		if (moor.pRight.isDrawn(draw) || moor.pRight.border || moor.pBottom.border) {
			// Sharp
			content.push(`${action.right} ${halfBlock}`)
			content.push(`${action.down} -${halfBlock}`)

			// Curve inward
		} else {
			content.push(`${action.arc} ${blockAngle} ${blockAngle} 0 0 0 ${blockAngle} -${blockAngle}`)
		}

		// Draw lines back
		while (true) {
			// Break if nothing above
			const { pTop, pMiddle } = moor
			if (pMiddle.y <= y || pTop.border) {
				break
			}

			// Right Side
			const { pRight, pTopRight } = moor
			if (pTop.isDrawn(draw) && pTopRight.isDrawn(draw) && !pRight.isDrawn(draw)) {
				content.push(`${action.arc} ${blockAngle} ${blockAngle} 0 0 1 ${blockAngle} -${blockAngle}`)
				content.push(`${action.right} -${halfBlock}`)
			} else {
				content.push(`${action.down} -${halfBlock}`)
			}

			// Continue
			current = pTop
			moor = current.getNeighbourhood()
			content.push(`${action.down} -${halfBlock}`)
		}

		// Top Right Corner
		if (moor.pRight.isDrawn(draw) || moor.pRight.border || moor.pTop.border) {

			// Curve outward
			if (moor.pTopRight.isDrawn(draw) && !moor.pTop.isDrawn(draw)) {
				content.push(`${action.down} -${halfBlock}`)
				content.push(`${action.down} -${halfBlock}`)
				content.push(`${action.arc} ${blockAngle} ${blockAngle} 0 0 1 -${blockAngle} ${blockAngle}`)

				// Sharp
			} else {
				content.push(`${action.down} -${halfBlock}`)
				content.push(`${action.right} -${halfBlock}`)
			}

			// Curve inward
		} else {
			content.push(`${action.arc} ${blockAngle} ${blockAngle} 0 0 0 -${blockAngle} -${blockAngle}`)
		}

		// Closing action
		content.push(action.close)

		return {
			end,
			content: content.join(' ')
		}
	}

	drawLine(v: number, o: 'down' | 'right') {
		const content = []
		const { x, y } = {
			x: o === 'down' ? v : 0,
			y: o === 'right' ? v : 0,
		}

		// Move to rect start
		content.push(`${action.move} ${x * blockSize} ${y * blockSize}`)

		// Draw Line
		content.push(`${action[o]} ${roomSize * blockSize}`)

		// Closing action
		content.push(action.close)

		return {
			stroke: '#7a7a7a',
			'stroke-width': 3,
			fill: 'transparent',
			content: content.join(' ')
		}
	}

	build(draw: number | undefined, attributes: Record<string, any> = {}) {
		let content = []

		for (let x = 0; x < roomSize; x++) {
			for (let y = 0; y < roomSize; y++) {
				const point = this.getCoord(x, y)

				if (point.isDrawn(draw)) {
					const { end, content: current } = this.drawRectangle(point, draw)
					content.push(current)
					y = end.y
				}
			}
		}

		return {
			...attributes,
			d: content.join(' ')
		}
	}

	buildGrid() {
		let content = []

		for (let x = 0; x <= roomSize; x++) {
			const { content: current } = this.drawLine(x, 'right')
			content.push(current)
		}

		for (let y = 0; y <= roomSize; y++) {
			const { content: current } = this.drawLine(y, 'down')
			content.push(current)
		}

		return {
			d: content.join(' ')
		}
	}

	buildSVG(grid: boolean = false, swamp: boolean = false, terrain: boolean = true, background: boolean = false) {
		const paths = []

		if (swamp) {
			const swampPath = this.build(draw.swamp)

			// Border
			paths.push({
				...swampPath,
				stroke: '#4a501e99',
				fill: '#4a501eff',
				'stroke-width': 50,
				'paint-order': 'stroke'
			})

			// Lighten
			paths.push({
				...swampPath,
				fill: '#ffffff11',
			})
		}

		if (grid) {
			paths.push({
				...this.buildGrid(),
				fill: 'transparent',
				stroke: '#82828244',
				'stroke-width': 2,
			})
		}

		if (swamp) {
			const swampPath = this.build(draw.swamp)

		}

		if (terrain) {
			const terrainPath = this.build(draw.wall)

			// Shadow
			paths.push({
				...terrainPath,
				stroke: '#00000022',
				'stroke-width': 60,
			})

			// Border
			paths.push({
				...terrainPath,
				stroke: '#000',
				'stroke-width': 20,
			})

			// Fill
			paths.push({
				...terrainPath,
				fill: '#444',
			})
		}

		return Room.makeSVG(paths, background)
	}
}