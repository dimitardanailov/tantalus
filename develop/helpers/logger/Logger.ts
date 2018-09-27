const appName = require('./../../../package').name;
const log4js = require('log4js');
const logger = log4js.getLogger(appName);

export class Logger {
	static info(message) {
		logger.info(message);
	}

	static debugVariable(variable) {
		logger.debug(`Variable value is: ${JSON.stringify(variable)}`);
	}

	static error(variable) {
		logger.error(variable);
	}
}
