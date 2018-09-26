import fs = require('fs');
import { TantalusFSWritableStream } from "../streams/TantalusFSWritableStream";
import { TantalusLogger } from "../logger/TantalusLogger";
import { TantalusTUSClientAWSS3, TantalusTUSClientAWSS3Options } from "../aws/TantalusTUSClientAWSS3";
import { ContentTypes } from "../../enums/ContentTypes";
import { TantalusZipHelper } from "../zip/TantalusZipHelper";

export class TantalusTusHelper {

	public static async exportToS3(cursor, operationId) {
		// Create FS stream configurations
		const fsStream = new TantalusFSWritableStream(`${operationId}.json`);
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
			TantalusLogger.info('cursor.close() ....');

			fsStream.readableStream.push(']');

			// No more data.input.push(null);
			fsStream.readableStream.push(null); 
		});

		fsStream.readableStream.on('end', () => {
			TantalusLogger.info('Stream end emitter ...');
		});

		fsStream.writeStream.on('finish', () => {
			TantalusLogger.info('Stream finish emitter ...');

			TantalusTusHelper.createZipFile(fsStream.path);
		});
	}

	private static createZipFile(path: string) {
		const promise = TantalusZipHelper.createZipFile(path);

		promise.then(() => {
			// Delete regular file
			fs.unlink(path, error => {
				if (error) TantalusLogger.error(error);

				TantalusLogger.info(`${path} was deleted.`);
			});

			// Upload zip file on AmazonS3 through tus.io
			TantalusTusHelper.uploadOnAmazonS3(`${path}.zip`);

		}).catch(error => {
			TantalusLogger.error(error);
		});	
	}

	private static uploadOnAmazonS3(path: string) {
		TantalusLogger.info(path);

		const tusClient = new TantalusTUSClientAWSS3();
		const options = new TantalusTUSClientAWSS3Options();
		options.path = path;
		options.bucketFileName = 'bucketFileName.json.zip';
		options.contentType = ContentTypes.ZIP;

		tusClient.upload(options);
	}
}
