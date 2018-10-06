import fs = require('fs');
import { Logger } from '../../../shared/helpers/logger/Logger';

/**
 * This class is using this example: 
 * https://docs.openshift.com/enterprise/3.0/dev_guide/application_health.html
 * 
 * Class will be responsible to create a file tmp file
 * If file exists service is up and running
 */
export class Health {
	public static LOCATION = 'agenda/health';

	public static createHealthFile() {
		const date = Date.now();

		fs.writeFile(Health.LOCATION, date.toString(), error => {
			if (error) { 
				Logger.fatal(error);

				throw error;
			}
		});
	}
}
