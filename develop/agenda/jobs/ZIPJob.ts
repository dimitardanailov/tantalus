import { Logger } from "../../shared/helpers/logger/Logger";
import { ZipHelper } from "../helpers/zip/ZipHelper";
import { FSHelper } from "../helpers/fs/FSHelper";

export class ZIPJob {

	public static readonly configurations = { 
		priority: 'high', 
		concurrency: 10 
	};

	public static async execute(job, done: Function) {
		const path = job.attrs.data.path || null;
		
		if (path === null) {
			done();

			return;
		}
		
		Logger.info(`Job should zip: ${path}`);

		// create a new zip file via zip archiver
		const operation = await ZipHelper.createZipFile(path);

		if (operation) {
			// delete file
			await FSHelper.deleteFile(path);

			job.disable();
		}

		done();
	}

}
