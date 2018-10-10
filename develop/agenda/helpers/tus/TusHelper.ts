import fs = require('fs');
import { FSWritableStream } from "../streams/FSWritableStream";
import { Logger } from "../../../shared/helpers/logger/Logger";
import {
	TUSClientAWSS3,
	TUSClientAWSS3Options
} from "../tus/TUSClientAWSS3";
import { ContentTypes } from "../../../shared/enums/ContentTypes";
import { ZipHelper } from "../zip/ZipHelper";
import { FSHelper } from '../fs/FSHelper';

export class TusHelper {

	public static async exportToS3(cursor, operationId) {
		// Create FS stream configurations
		const fsStream = new FSWritableStream(`${operationId}.json`);
		fsStream.saveStreamOnFileSystem();

		fsStream.readableStream.push('[');

		const operations = [];

		// Cursor
		operations.push(await TusHelper.iterateCursor(cursor, fsStream));
		operations.push(await TusHelper.closeCursor(cursor, fsStream));

		// fs stream
		operations.push(await TusHelper.fsStreamClose(fsStream));

		// zip archiver
		operations.push(await ZipHelper.createZipFile(fsStream.path));

		// delete file
		await FSHelper.deleteFile(fsStream.path);

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
			fsStream.writeStream.on('finish', () => resolve(true));
		});
	}

	private static uploadOnAmazonS3(path: string) {
		Logger.info(path);

		const tusClient = new TUSClientAWSS3();
		const options = new TUSClientAWSS3Options();
		options.path = path;
		options.bucketFileName = 'bucketFileName.json.zip';
		options.contentType = ContentTypes.ZIP;

		tusClient.upload(options);
	}
}
