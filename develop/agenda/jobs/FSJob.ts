import { FSWritableStream } from "../helpers/streams/FSWritableStream";
import { FSHelper } from "../helpers/fs/FSHelper";
import { Logger } from "../../shared/helpers/logger/Logger";
import { QueryRepository } from "../../shared/repositories/QueryRepository";
import { JobHelper } from "../tus/JobHelper";
import { BackgroundJobNames } from "../../shared/enums/BackgroundJobNames";
import { BackgroundJobWhen } from "../../shared/enums/BackgroundJobWhen";

export class FSJob { 

	public static readonly configurations = { 
		priority: 'high', 
		concurrency: 10 
	};

	public static async execute(job, done: Function) {
		// Parse queries ...
		const repository = new QueryRepository();
		const cursor = repository.getCursorToAllRecords();

		const attributes = await FSJob.streamMongoDataToFS(cursor, job.attrs._id);

		Logger.info(attributes);

		if (attributes !== null) {
			Logger.info(`File was created on file system and filename is: ${attributes.path}`);

			await FSJob.createZipJob(attributes);

			job.disable();
		}
		
		done();
	}

	public static async streamMongoDataToFS(cursor, operationId) {
		// Create FS stream configurations
		const fsStream = new FSWritableStream(`${operationId}.json`);
		fsStream.saveStreamOnFileSystem();

		fsStream.readableStream.push('[');

		const operations = [];

		// Cursor
		operations.push(await FSJob.iterateCursor(cursor, fsStream));
		operations.push(await FSJob.closeCursor(cursor, fsStream));

		// fs stream
		operations.push(await FSJob.fsStreamClose(fsStream));

		// If all operation related with fs are successful, next step is upload on Amazon S3
		const output = operations.filter(operation => { return !operation });
		if (output.length === 0) {
			return {
				path: fsStream.path
			};
		} 

		return null;
	}

	private static iterateCursor(cursor, fsStream: FSWritableStream): Promise<Boolean> {
		return new Promise<Boolean>(resolve => {
			let firstRecord = true;
			cursor.on('data', doc => {

				// Add a new record
				if (!firstRecord) {
					fsStream.readableStream.push(`,${JSON.stringify(doc)}`);
				} else {
					fsStream.readableStream.push(JSON.stringify(doc));
				}
	
				firstRecord = false;
			});

			resolve(true);
		});
	}

	private static closeCursor(cursor, fsStream: FSWritableStream): Promise<Boolean> {
		return new Promise<Boolean>(resolve => {
			cursor.on('close', () => {
				Logger.info('cursor.close() ....');
	
				fsStream.readableStream.push(']');
	
				// No more data.input.push(null);
				fsStream.readableStream.push(null);
			});

			resolve(true);
		});
	}

	private static fsStreamClose(fsStream: FSWritableStream): Promise<Boolean> {
		return new Promise<Boolean>(resolve => {
			Logger.info('stream was closed');
			fsStream.writeStream.on('finish', () => resolve(true));
		});
	}

	private static async createZipJob(attributes: Object) {
		// Create a new job responsible to create a zip file
		const backgroundJob = new JobHelper(
			BackgroundJobNames.ZIP
		);

		const agenda = backgroundJob.getAgenda();

		await agenda.start();

		// Create job responsible to create a file ... 
		await agenda.schedule(
			BackgroundJobWhen.ZIP, 
			BackgroundJobNames.ZIP, 
			attributes
		);
	}
}
