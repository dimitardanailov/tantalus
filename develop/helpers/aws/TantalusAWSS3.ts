import AWS = require('aws-sdk');
import fs = require('fs');
import zlib = require('zlib');
import { TantalusLogger } from "../logger/TantalusLogger";
import { TantalusZIPStream } from './TantalusZIPStream';
import { Writable, Readable, Stream } from 'stream';

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

		/*
		s3.upload({
			Bucket: TantalusAWSS3.getBucketName(),
			Key : s3Key,
			Body: pass
		}, (err, data) => {
			TantalusLogger.debugVariable(data);
		});

		return pass;
		*/

		/*
		this.s3.putObject().promise().then(data => {
			TantalusLogger.info('Success');
		});*/

		/*
		this.s3.upload({ Body: body }).
			on('httpUploadProgress', function(evt) {
				console.log('Progress:', evt.loaded, '/', evt.total); 
			}).
			send(function(err, data) { console.log(err, data) });*/

		// archiver.output = fs.createWriteStream(join(__dirname, s3FileName));
		// console.log(archiver.output);
		//archiver.output = fs.createWriteStream(join(__dirname, s3FileName));

		/*
		

		TantalusLogger.debugVariable(params.Key);
		s3.putObject(params).promise();
		
		var putObjectPromise = s3.putObject(params).promise();
		putObjectPromise.then((data) => {
			TantalusLogger.info('Success');
		}).catch(function(error) {
			TantalusLogger.debugVariable(error);
		}); */
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
