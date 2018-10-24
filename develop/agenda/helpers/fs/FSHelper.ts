import fs = require('fs');
import { Logger } from '../../../shared/helpers/logger/Logger';

export class FSHelper {

	public static deleteFile(path): Promise<Boolean> {
		return new Promise<Boolean>((resolve, reject) => {
			fs.unlink(path, error => {
				if (error) {
					Logger.addPromiseError('FSHelper.deleteFile', error);
					reject(error);

					return;
				}

				resolve(true);
			});
		});
	}
}
