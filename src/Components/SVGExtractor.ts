import SVG from './SVG';
import SVGMineral from './SVGMineral';

type Extractor = {
	owner: {
		username: string
	}
};

/**
 * Returns a html/svg string representation of the given extractor object.
 * @author Spedwards
 */
export default class SVGExtractor extends SVG {
	private mineral?: SVGMineral;

	/**
	 * @author Spedwards
	 * @param {StructureExtractor | string} extractor - StructureExtractor object or ID string corrosponding to a StructureExtractor object.
	 * @param {Mineral | string} [mineral] - Mineral object, mineral type, or ID string corrosponding to a Mineral object. Optional, will display none if undefined.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(private extractor: Extractor, mineral: string, protected size: number = 50) {
		super();
		// let object = this.validateConstructor(source, SVG.SOURCE);
		// if (object === false) throw new Error('Not a Source object!');
		
		if (mineral) {
			this.mineral = new SVGMineral(mineral, 160);
		}
		this.string = this.toString();
	}

	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	 toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;
			
			const COLOUR = this.player === this.extractor.owner.username ? `#8FBB93` : `#ED5557`;
			
			let outStr = `<svg height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 200 200">` +
					`<g transform="translate(100,100)">`;
			
			if (this.mineral) {
				outStr += `<g transform="translate(-80,-80)">` +
						this.mineral.toString() +
						`</g>`;
			}
			
			outStr += `<path d="M 80 0 A 80 80 0 0 1 40 69.28 M  -40 69.28 A 80 80 0 0 1 -80 0 M -40 -69.28 A 80 80 0 0 1 40 -69.28" fill-opacity="0" stroke="${COLOUR}" stroke-width="20">` +
					`<animateTransform attributeName="transform" attributeType="XML" dur="4s" from="0 0 0" to="360 0 0" repeatCount="indefinite" type="rotate" calcMode="linear" />` +
					`</path></g></svg>`;
			
			return outStr;
		}
		return this.string;
	}

	static getSVG(extractor: Extractor, mineral: string, size?: number): string {
		return new SVGExtractor(extractor, mineral, size).toString();
	}
};
