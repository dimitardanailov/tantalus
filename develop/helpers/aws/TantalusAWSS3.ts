import AWS = require('aws-sdk');
import { TantalusLogger } from "../logger/TantalusLogger";
import { TantalusZIPStream } from './TantalusZIPStream';

export class TantalusAWSS3 {

	public uploadToS3(files: Array<string>, s3FileName: string) {
		// Create a bridge between application and S3
		this.configUpdate();

		const s3 = new AWS.S3();

		// Create a new archiver task
		const archiver = new TantalusZIPStream();
		archiver.bucket = TantalusAWSS3.getBucketName();
		archiver.files = files;
		archiver.createEmptyStream();

		// archiver.output = fs.createWriteStream(join(__dirname, s3FileName));
		// console.log(archiver.output);
		//archiver.output = fs.createWriteStream(join(__dirname, s3FileName));

		/*
		const params = {
			Bucket: TantalusAWSS3.getBucketName(),
			Body : fs.createReadStream(fileLocation.toString()),
			Key : 'test.json'
		};

		TantalusLogger.debugVariable(params.Key);
		s3.putObject(params).promise();
		
		var putObjectPromise = s3.putObject(params).promise();
		putObjectPromise.then((data) => {
			TantalusLogger.info('Success');
		}).catch(function(error) {
			TantalusLogger.debugVariable(error);
		}); */
	}

	private static getBucketName() {
		return process.env.TANTALUS_S3_BUCKET || '';
	}

	private configUpdate() {
		AWS.config.update({
			accessKeyId: process.env.TANTALUS_S3_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.TANTALUS_S3_SECRET_ACCESS_KEY || ''
		});
	}
}
