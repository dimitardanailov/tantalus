import { JsonController, Get, Post, Param, Delete, Body, Controller, OnUndefined, InternalServerError } from "routing-controllers";
import { Service } from "typedi";
import { QueryController } from './QueryController';
import { QueryRepository } from "../repositories/QueryRepository";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";
import { QueryMockObject } from "../test/mock-objects/QueryMockObject";
import { IQuery } from "../interfaces/IQuery";
import { TantalusAWSS3 } from "../helpers/aws/TantalusAWSS3";

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
		const fileLocation = `${__dirname.replace('controllers', '')}config/local.json`;

		// const awsS3 = new TantalusAWSS3();
		// awsS3.uploadToS3([fileLocation, fileLocation], 'test.zip');
		
		this.repository.stream();

		return `${fileLocation}`;
	}

	@Get('/helloworld')
	helloworld() {
		return 'Hello world !!!';
	}
}
