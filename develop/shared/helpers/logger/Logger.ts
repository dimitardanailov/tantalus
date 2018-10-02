import { AppSettings } from "../app-settings/AppSettings";

const log4js = require('log4js');
const logger = log4js.getLogger(AppSettings.getAppName());
logger.level = process.env.LOGGER_LEVEL || 'debug';

export class Logger {
	public static info(message) {
		logger.info(message);
	}

	public static debugVariable(variable) {
		logger.debug(`Variable value is: ${JSON.stringify(variable)}`);
	}

	public static error(variable) {
		logger.error(variable);
	}

	public static fatal(message) {
		logger.fatal(message);
	}
}
