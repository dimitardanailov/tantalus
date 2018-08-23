import { JsonController, Get, Post, Param, Delete, Body, Controller, OnUndefined, InternalServerError } from "routing-controllers";
import { Service } from "typedi";
import { QueryController } from './QueryController';
import { QueryRepository } from "../repositories/QueryRepository";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";
import { QueryMockObject } from "../test/mock-objects/QueryMockObject";
import { IQuery } from "../interfaces/IQuery";

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

	@Get('/helloworld')
	helloworld() {
		return 'Hello world !!!';
	}
}
