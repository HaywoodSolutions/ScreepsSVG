import SVG from './SVG';

type KeeperLair = {};

/**
 * Returns a html/svg string representation of a keeper lair.
 */
export default class SVGKeeperLair extends SVG {
	/**
	 * @author Spedwards
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(private keeperLair: KeeperLair, protected size: number = 50) {
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
			
			return `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 80 80">` +
					`<g transform="translate(40,40)">` +
					`<g>` +
					`<ellipse rx="40" ry="40" cx="0" cy="0" fill="#000000" />` +
					`<ellipse rx="33" ry="33" cx="0" cy="0" fill="#780207">` +
					`<animateTransform attributeName="transform" attributeType="XML" dur="2s" repeatCount="indefinite" type="scale" values="0 0;1 1;1 1" calcMode="linear" />` +
					`<animate attributeName="fill" dur="2s" repeatCount="indefinite" values="#780207; #000000" />` +
					`</ellipse>` +
					`<ellipse rx="33" ry="33" cx="0" cy="0" fill="#000000">` +
					`<animateTransform attributeName="transform" attributeType="XML" dur="2s" repeatCount="indefinite" type="scale" values="0 0;0.3 0.3;1 1" calcMode="linear" />` +
					`</ellipse>` +
					`</g></g></svg>`;
		}
		return this.string;
	}

	static getSVG(keeperLair: KeeperLair, size?: number): string {
		return new SVGKeeperLair(keeperLair, size).toString();
	}
};
