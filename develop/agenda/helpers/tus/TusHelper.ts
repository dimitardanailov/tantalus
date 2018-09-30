import fs = require('fs');
import { FSWritableStream } from "../streams/FSWritableStream";
import { Logger } from "../../../shared/helpers/logger/Logger";
import {
	TUSClientAWSS3,
	TUSClientAWSS3Options
} from "../tus/TUSClientAWSS3";
import { ContentTypes } from "../../../shared/enums/ContentTypes";
import { ZipHelper } from "../zip/ZipHelper";

export class TusHelper {

	public static async exportToS3(cursor, operationId) {
		// Create FS stream configurations
		const fsStream = new FSWritableStream(`${operationId}.json`);
		fsStream.saveStreamOnFileSystem();

		fsStream.readableStream.push('[');

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

		cursor.on('close', () => {
			Logger.info('cursor.close() ....');

			fsStream.readableStream.push(']');

			// No more data.input.push(null);
			fsStream.readableStream.push(null);
		});

		fsStream.readableStream.on('end', () => {
			Logger.info('Stream end emitter ...');
		});

		fsStream.writeStream.on('finish', () => {
			Logger.info('Stream finish emitter ...');

			TusHelper.createZipFile(fsStream.path);
		});
	}

	private static createZipFile(path: string) {
		const promise = ZipHelper.createZipFile(path);

		promise.then(() => {
			// Delete regular file
			fs.unlink(path, error => {
				if (error) Logger.error(error);

				Logger.info(`${path} was deleted.`);
			});

			// Upload zip file on AmazonS3 through tus.io
			TusHelper.uploadOnAmazonS3(`${path}.zip`);

		}).catch(error => {
			Logger.error(error);
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
