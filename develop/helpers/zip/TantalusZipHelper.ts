import { TantalusLogger } from '../logger/TantalusLogger';
import { exec } from 'child_process';

export class TantalusZipHelper {

	public static async createZipFile(path) {
		const zipName = `${path}.zip`;
		return new Promise((resolve, reject) => {
			exec(`zip ${zipName} ${path}`, (error) => {
				if (error) reject(error);

				resolve(zipName);
			});
		});
	}

}
