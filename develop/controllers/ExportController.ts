import { JsonController, Get, Post, Param, Delete, Body } from "routing-controllers";
import { Service } from "typedi";
import { QueryController } from './QueryController';

@Service()
@JsonController()
export class ExportController extends QueryController {

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

	@Get("/helloworld")
	helloworld() {
		return "Hello world !!!";
	}
}
