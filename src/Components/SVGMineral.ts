import SVG from './SVG';

type MineralType = string;

export default class SVGMineral extends SVG {
	/**
	 * @author Spedwards
	 * @param {Mineral | string} mineral - Mineral object, mineral type, or ID string corrosponding to a Mineral object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(private mineralType: MineralType, protected size: number = 50) {
		super();
		// let object = this.validateConstructor(source, SVG.SOURCE);
		// if (object === false) throw new Error('Not a Source object!');
		
		this.string = this.toString();
	}

	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;
			
			const COLOURS = this.getColours();
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 150 150">` +
					`<g transform="translate(75,75)">` +
					`<ellipse rx="60" ry="60" cx="0" cy="0" fill="${COLOURS.background}" stroke="${COLOURS.foreground}" stroke-width="10" />` +
					`<text font-size="82" font-weight="bold" text-anchor="middle" style="font-family: Roboto, serif" x="0" y="28" fill="${COLOURS.foreground}">${this.mineralType}</text>` +
					`</g></svg>`;
		}
		return this.string;
	}

	/**
	 * Get mineral colours.
	 * @returns {Object}
	 */
	getColours(): {
		foreground: string,
		background: string
	} {
		switch(this.mineralType) {
			case "RESOURCE_CATALYST":
				return {
					foreground: '#FF7A7A',
					background: '#4F2626',
				};
			case "RESOURCE_KEANIUM":
				return {
					foreground: '#9370FF',
					background: '#331A80',
				};
			case "RESOURCE_LEMERGIUM":
				return {
					foreground: '#89F4A5',
					background: '#3F6147',
				};
			case "RESOURCE_UTRIUM":
				return {
					foreground: '#88D6F7',
					background: '#1B617F',
				};
			case "RESOURCE_ZYNTHIUM":
				return {
					foreground: '#F2D28B',
					background: '#594D33',
				};
			default:
				return {
					foreground: '#CCCCCC',
					background: '#4D4D4D',
				};
		}
	}

	static getSVG(mineralType: MineralType, size?: number): string {
		return new SVGMineral(mineralType, size).toString();
	}
};
