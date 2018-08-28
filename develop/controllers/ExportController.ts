import { JsonController, Get, Post, Param, Delete, Body, Controller, OnUndefined, InternalServerError } from "routing-controllers";
import { Service } from "typedi";
import { QueryController } from './QueryController';
import { QueryRepository } from "../repositories/QueryRepository";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";
import { QueryMockObject } from "../test/mock-objects/QueryMockObject";
import { IQuery } from "../interfaces/IQuery";
import { TantalusAWSS3 } from "../helpers/aws/TantalusAWSS3";
import { TantalusStream } from "../helpers/streams/TantalusStream";
import { ContentTypes } from "../enums/ContentTypes";
import { TantalusTUSClientAWSS3 } from "../helpers/aws/TantalusTUSClientAWSS3";

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

	@Get('/tus')
	tusUpload() {
		const cursor = this.repository.getCursorToAllRecords();

		// Stream and AWS S3 configurations
		const tusClient = new TantalusTUSClientAWSS3();
		const appStream = new TantalusStream();
		appStream.input.push('{[');
		appStream.input.pipe(tusClient.upload('test'));

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

		return 'TUS Completed !!!';
	}

	@Get('/helloworld')
	helloworld() {
		return 'Hello world !!!';
	}
}
