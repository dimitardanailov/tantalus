import AWS = require('aws-sdk');
import { TantalusLogger } from "../logger/TantalusLogger";
import { Stream } from 'stream';

export class TantalusAWSS3 {

	private body;

	public uploadToS3(s3Key: string) {
		// Create a bridge between application and S3
		TantalusAWSS3.createAWSCongiguration();

		var pass = new Stream.PassThrough();

		const s3 = new AWS.S3();
		const uploadOperator = s3.upload({
			Bucket: TantalusAWSS3.getBucketName(),
			Key : s3Key,
			Body: pass
		});

		uploadOperator.on('httpUploadProgress', progress => {
			TantalusLogger.debugVariable(progress);
		});

		uploadOperator.promise().then(data => {
			TantalusLogger.debugVariable(data);
		});

		return pass;
	}

	private static createAWSCongiguration() {
		AWS.config.update( { 
			accessKeyId: TantalusAWSS3.getAccessKey(), 
			secretAccessKey: TantalusAWSS3.getSecretAccessKey()
		});
	}

	private static getBucketName() {
		return process.env.TANTALUS_S3_BUCKET || '';
	}

	private static getAccessKey() {
		return process.env.TANTALUS_S3_ACCESS_KEY_ID || '';
	}

	private static getSecretAccessKey() {
		return process.env.TANTALUS_S3_SECRET_ACCESS_KEY || '';
	}
}
