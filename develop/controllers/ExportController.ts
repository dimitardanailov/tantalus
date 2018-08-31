import { JsonController, Get, Post, Param, Delete, Body, Controller, OnUndefined, InternalServerError } from "routing-controllers";
import { Service } from "typedi";
import { QueryController } from './QueryController';
import { QueryRepository } from "../repositories/QueryRepository";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";
import { QueryMockObject } from "../test/mock-objects/models/QueryMockObject";
import { IQuery } from "../interfaces/IQuery";
import { TantalusAWSS3 } from "../helpers/aws/TantalusAWSS3";
import { TantalusStream } from "../helpers/streams/TantalusStream";
import { ContentTypes } from "../enums/ContentTypes";
import { TantalusTUSClientAWSS3, TantalusTUSClientAWSS3Options } from "../helpers/aws/TantalusTUSClientAWSS3";
import { TantalusFSWritableStream } from "../helpers/streams/TantalusFSWritableStream";

@Service()
@JsonController()
@Controller("/exports")
export class ExportController extends QueryController {

	constructor(private repository: QueryRepository) {
		super();
	}

	/*
	exportParseQuery() {
		// Check application id and ... are correct
		// Create a new database record
		// Try to parse Parse queto to MongoDB
		// Upload record on Amazon S3
		// Send an email to user about status of query
	}

	updateProgressStatus() {
		// Get record by MongoDB ID 
		// Update percent data
		// 
	} */

	@Get('/createrecord')
	@OnUndefined(204)
	async createRecord(): Promise<IQuery> {
		// Create a dummy Query
		const mockObject = new QueryMockObject();

		const promise = this.repository.save(mockObject.query);

		return await promise.then(dbQuery => {
			return dbQuery.toJSON();
		});
	}

	@Get('/aws')
	awsUpload() {
		const cursor = this.repository.getCursorToAllRecords();
		const appStream = new TantalusStream();
		appStream.input.push('{[');

		const awsS3 = new TantalusAWSS3();
		// appStream.input.pipe(awsS3.uploadToS3('test', ContentTypes.JSON));

		cursor.on('data', function(doc) {
			appStream.input.push(JSON.stringify(doc));
		});

		cursor.on('close', function() {
			TantalusLogger.info('done ....');
			
			appStream.input.push(']}');
			appStream.input.push(null); // No more data
			TantalusLogger.info('Stream was created ...');
		});

		appStream.input.on('end', () => {
			TantalusLogger.info('Stream. end emitter ...');
		});

		return 'Completed !!!';
	}

	@Get('/fs')
	fsUplo2ad() {		
		const cursor = this.repository.getCursorToAllRecords();

		// Create FS stream configurations
		const fsStream = new TantalusFSWritableStream('test.json');
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

		return 'Completed !!!';
	}

	@Get('/helloworld')
	helloworld() {
		return 'Hello world !!!';
	}
}
