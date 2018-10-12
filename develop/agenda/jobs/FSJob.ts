import { FSWritableStream } from "../helpers/streams/FSWritableStream";
import { FSHelper } from "../helpers/fs/FSHelper";
import { Logger } from "../../shared/helpers/logger/Logger";
import { QueryRepository } from "../../shared/repositories/QueryRepository";

export class FSJob { 

	public static async setup(job, done: Function) {
		// Parse queries ...
		const repository = new QueryRepository();
		const cursor = repository.getCursorToAllRecords();

		const output = await FSJob.streamMongoDataToFS(cursor, job.attrs._id);

		Logger.info(output);

		if (output) {
			Logger.info(`File was created on file system. File id is: ${job.attrs._id}`);
			job.disable();
		}
		
		done();
	}

	private static async streamMongoDataToFS(cursor, operationId) {
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
			return true;
		} 

		return false;
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
}
