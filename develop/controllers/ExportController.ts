import { JsonController, Get, Post, Param, Delete, Body, Controller } from "routing-controllers";
import { Service } from "typedi";
import { QueryController } from './QueryController';
import { QueryRepository } from "../repositories/QueryRepository";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";
import { QueryMockObject } from "../test/mock-objects/QueryMockObject";
import { Query } from "../models/Query";

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
	createRecord(): Query {
		const mockObject = new QueryMockObject();
		
		return this.repository.save(mockObject.query);
	}

	@Get('/helloworld')
	helloworld() {
		return 'Hello world !!!';
	}
}
