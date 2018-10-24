import { Logger } from "../logger/Logger";

export class PromiseRejection {

	public static loadUnhandledRejectionWatcher() {
		process.on('unhandledRejection', (reason, promise) => {
			Logger.info('Unhandled Rejection at:');
			Logger.error(reason.stack || reason);
			// Recommended: send the information to sentry.io
			// or whatever crash reporting service you use
		})
	}
}
