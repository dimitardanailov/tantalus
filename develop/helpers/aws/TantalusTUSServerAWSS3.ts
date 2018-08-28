import tus = require("tus-node-server");
import { TantalusAWSS3 } from "./TantalusAWSS3";

export class TantalusTUSServerAWSS3 {

	private static readonly PART_SIZE = 8 * 1024 * 1024;
	private static readonly TEMP_DIR = 'tus-s3-store';

	public static createDateStore() {
		const config = {
			path: '/files',
			bucket: TantalusAWSS3.getBucketName(),
			accessKeyId: TantalusAWSS3.getAccessKey(),
			secretAccessKey: TantalusAWSS3.getSecretAccessKey(),
			region: TantalusAWSS3.getAmazonRegion(),
			partSize: TantalusTUSServerAWSS3.PART_SIZE,
			tmpDirPrefix: TantalusTUSServerAWSS3.TEMP_DIR
		};

		return new tus.S3Store(config);
	}
}
