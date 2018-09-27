import tus = require("tus-node-server");
import { AWSS3 } from "./AWSS3";

export class TUSServerAWSS3 {

	private static readonly PART_SIZE = 8 * 1024 * 1024;
	private static readonly TEMP_DIR = 'tus-s3-store';

	public static createDateStore() {
		const config = {
			path: '/files',
			bucket: AWSS3.getBucketName(),
			accessKeyId: AWSS3.getAccessKey(),
			secretAccessKey: AWSS3.getSecretAccessKey(),
			region: AWSS3.getAmazonRegion(),
			partSize: TUSServerAWSS3.PART_SIZE,
			tmpDirPrefix: TUSServerAWSS3.TEMP_DIR
		};

		return new tus.S3Store(config);
	}
}
