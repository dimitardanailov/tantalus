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

	public static addPromiseError(metod, error) {
		logger.info(metod);
		logger.error(error);
	}

	public static printFeatureToggleMessage(message) {
		console.log('\x1b[45m%s\x1b[0m', message);
	}

	public static backgroundJobInfo(message) {
		console.log('\x1b[37m%s\x1b[0m', message);
	}
}
