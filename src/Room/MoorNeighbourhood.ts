'use strict'

import Point from './Point';
import {
  roomSize,
} from './Constants';

export default class MoorNeighbourhood {
	private values: (number|undefined)[];
	
  constructor(private points: Point[]) {
		this.values = this.points.map(point => point ? point.v : undefined);
  }

  static getNeighbourhood(point: Point) {
    const { x, y, room } = point;

    const topEdge = y === 0;
    const leftEdge = x === 0;
    const bottomEdge = y === roomSize - 1;
    const rightEdge = x === roomSize - 1;

    return new MoorNeighbourhood([
      topEdge || leftEdge ? Point.border : room.getCoord(x-1, y-1),
      topEdge ? Point.border : room.getCoord(x, y-1),
      topEdge || rightEdge ? Point.border : room.getCoord(x+1, y-1),
      leftEdge ? Point.border : room.getCoord(x-1, y),
      point,
      rightEdge ? Point.border : room.getCoord(x+1, y),
      bottomEdge || leftEdge ? Point.border : room.getCoord(x-1, y+1),
      bottomEdge ? Point.border : room.getCoord(x, y+1),
      bottomEdge || rightEdge ? Point.border : room.getCoord(x+1, y+1),
    ])
  }

  get pTopLeft(): Point {
    return this.points[0]
  }

  get pTop(): Point {
    return this.points[1]
  }

  get pTopRight(): Point {
    return this.points[2]
  }

  get pLeft(): Point {
    return this.points[3]
  }

  get pMiddle(): Point {
    return this.points[4]
  }

  get pRight(): Point {
    return this.points[5]
  }

  get pBottomLeft(): Point {
    return this.points[6]
  }

  get pBottom(): Point {
    return this.points[7]
  }

  get pBottomRight(): Point {
    return this.points[8]
  }
}
