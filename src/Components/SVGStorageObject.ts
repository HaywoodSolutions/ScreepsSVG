import SVG from './SVG';
import SVGResource, { Resource } from './SVGResource';

export type StorageObject = {
	store: {[key in Resource]: number},
	storeCapacity: number,
	owner: {
		username: string
	}
};

/**
 * Acts as the parent to SVGStorage and SVGTerminal.
 * @author Helam
 * @author Enrico
 * @author Spedwards
 */
export default class SVGStorageObject extends SVG {
	readonly object: StorageObject;
	private contents: any;

	/**
	 * @author Spedwards
	 * @param {StructureStorage | StructureContainer | StructureTerminal} object - Either a StructureStorage, StructureContainer or StructureTerminal object, or an ID string corrosponding to one.
	 */
	constructor(object: StorageObject, expectedType: any) {
		super();
		// let structure = this.validateConstructor(object, expectedType);
		// if (structure === false) throw new Error('Not a Structure object!');

		this.object = object;
		this.contents = this.getContents();
	}

	/**
	 * Outputs the contents of any StructureStorage, StructureContainer or StructureTerminal
	 * object as a html/svg string.
	 * @author Helam
	 * @author Enrico
	 */
	getContents(): string {
		if (!this.contents) {
			let outStr = '';
			
			(Object.keys(this.object.store) as Resource[]).forEach((type) => {
				outStr += (new SVGResource(type, this.object.store[type])).toString();
				outStr += '\n';
			});
			return outStr;
		}
		return this.contents;
	}
}