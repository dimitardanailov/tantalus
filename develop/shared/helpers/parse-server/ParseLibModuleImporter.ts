
export class ParseLibModuleImporter {

	static addModule(path) {
		const module = require('../../../parse-server/node_modules/' + path);
		
		return module;
	}
}
