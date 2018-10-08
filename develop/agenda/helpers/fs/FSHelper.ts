import fs = require('fs');

export class FSHelper {

	public static deleteFile(path): Promise<Boolean> {
		return new Promise<Boolean>((resolve, reject) => {
			fs.unlink(path, error => {
				if (error) reject(error);

				resolve(true);
			});
		});
	}
}
