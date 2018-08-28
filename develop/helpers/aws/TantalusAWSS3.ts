import AWS = require('aws-sdk');
import { Stream } from 'stream';
import { TantalusLogger } from "../logger/TantalusLogger";
import { ContentTypes } from "../../enums/ContentTypes";

export class TantalusAWSS3 {

	private body;

	public uploadToS3(s3Key: string, contentType: ContentTypes) {
		// Create a bridge between application and S3
		TantalusAWSS3.createAWSCongiguration();

		// The stream.PassThrough class is a trivial implementation of 
		// a Transform stream that simply passes the input bytes across to the output. 
		// Its purpose is primarily for examples and testing, 
		// but there are some use cases where stream.PassThrough is useful as a 
		// building block for novel sorts of streams
		const pass = new Stream.PassThrough();

		const s3 = new AWS.S3();
		const uploadOperator = s3.upload({
			Bucket: TantalusAWSS3.getBucketName(),
			Key : s3Key,
			Body: pass,
			ContentType: contentType
		});

		uploadOperator.on('httpUploadProgress', progress => {
			TantalusLogger.debugVariable(progress);
		});

		uploadOperator.promise().then(data => {
			TantalusLogger.debugVariable(data);
		});

		return pass;
	}

	public static getBucketName() {
		return process.env.TANTALUS_S3_BUCKET || '';
	}

	public static getAccessKey() {
		return process.env.TANTALUS_S3_ACCESS_KEY_ID || '';
	}

	public static getSecretAccessKey() {
		return process.env.TANTALUS_S3_SECRET_ACCESS_KEY || '';
	}

	public static getAmazonRegion() {
		return process.env.TANTALUS_AMAZON_REGION || 'eu-central-1';
	}

	private static createAWSCongiguration() {
		AWS.config.update( { 
			accessKeyId: TantalusAWSS3.getAccessKey(), 
			secretAccessKey: TantalusAWSS3.getSecretAccessKey()
		});
	}
}
