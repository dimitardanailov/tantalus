const appName = require('./../../../package').name;
const log4js = require('log4js');
const logger = log4js.getLogger(appName);

export class TantalusLogger {
	static info(message) {
		logger.info(message);
	}
}
