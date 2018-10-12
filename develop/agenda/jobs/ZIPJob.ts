import { Logger } from "../../shared/helpers/logger/Logger";
import { ZipHelper } from "../helpers/zip/ZipHelper";
import { FSHelper } from "../helpers/fs/FSHelper";
import { JobHelper } from "../tus/JobHelper";
import { BackgroundJobNames } from "../../shared/enums/BackgroundJobNames";
import { BackgroundJobWhen } from "../../shared/enums/BackgroundJobWhen";

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

			Logger.info('Zip file was created');

			// delete a file
			await FSHelper.deleteFile(path);

			const attributes = { path };

			await ZIPJob.createTUSJob(attributes);

			job.disable();
		}

		done();
	}

	private static async createTUSJob(attributes) {
		// Create a new job responsible to create a zip file
		const backgroundJob = new JobHelper(
			BackgroundJobNames.TUS
		);

		const agenda = backgroundJob.getAgenda();

		await agenda.start();

		// Create job responsible to create a file ... 
		await agenda.schedule(
			BackgroundJobWhen.TUS, 
			BackgroundJobNames.TUS, 
			attributes
		);
	}

}
