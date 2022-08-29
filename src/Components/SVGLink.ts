import SVG from './SVG';

type Link = {
	energy: number,
	energyCapacity: number,
	owner: {
		username: string
	}
};

/**
 * Returns a html/svg string representation of the given link object.
 * @author Spedwards
 */
export default class SVGLink extends SVG {
	/**
	 * @author Spedwards
	 * @param {StructureLink | string} link - StructureLink object or ID string corrosponding to a StructureLink object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(private link: Link, protected size: number = 50) {
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

			const ENERGY_SCALE = 0.6 * this.link.energy / this.link.energyCapacity;
			
			const BORDER_COLOUR = this.player === this.link.owner.username ? `#8FBB93` : `#ED5557`;

			let outStr = `<svg class="link owner" height="${SVG_SIZE}" width="${SVG_SIZE * 0.8}" viewBox="0 0 50 100">` +
				`<g opacity="1" transform="translate(25,50)"><g>` +
				`<path d="M 0 -50 L 40 0 L 0 50 L -40 0 Z" fill="#181818" stroke="${BORDER_COLOUR}" stroke-width="5" />` +
				`<path d="M 0 -50 L 40 0 L 0 50 L -40 0 Z" fill="#555" transform="scale(0.6 0.6)" />`;

			if (this.link.energy > 0) {
				outStr += `<path d="M 0 -50 L 40 0 L 0 50 L -40 0 Z" fill="#ffe56d" transform="scale(${ENERGY_SCALE} ${ENERGY_SCALE})"></path>`
			}

			outStr += `</g></g></svg>`;

			return outStr;
		}
		return this.string;
	}

	static getSVG(link: Link, size?: number): string {
		return new SVGLink(link, size).toString();
	}
};
