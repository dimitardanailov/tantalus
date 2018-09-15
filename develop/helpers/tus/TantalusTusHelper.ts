import { TantalusFSWritableStream } from "../streams/TantalusFSWritableStream";
import { TantalusLogger } from "../logger/TantalusLogger";
import { TantalusTUSClientAWSS3, TantalusTUSClientAWSS3Options } from "../aws/TantalusTUSClientAWSS3";
import { ContentTypes } from "../../enums/ContentTypes";

export class TantalusTusHelper {

	public static async exportToS3(cursor, operationId) {
		// Create FS stream configurations
		const fsStream = new TantalusFSWritableStream(`${operationId}.json`);
		fsStream.readableStream.push('{[');

		cursor.on('data', doc => {
			fsStream.readableStream.push(JSON.stringify(doc));
		});

		cursor.on('close', () => {
			TantalusLogger.info('cursor.close() ....');

			fsStream.readableStream.push(']}');

			// No more data.input.push(null);
			fsStream.readableStream.push(null); 
		});

		fsStream.readableStream.on('end', () => {
			TantalusLogger.info('Stream end emitter ...');
			
		});

		fsStream.writeStream.on('finish', () => {
			TantalusLogger.info('Stream finish emitter ...');

			const tusClient = new TantalusTUSClientAWSS3();
			const options = new TantalusTUSClientAWSS3Options();
			options.path = fsStream.path;
			options.bucketFileName = 'bucketFileName.json.gz';
			options.contentType = ContentTypes.GZIP;

			tusClient.upload(options);
		});
	}
}
