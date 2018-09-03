import { JsonController, Get, Post, Param, Delete, Body, Controller, OnUndefined, InternalServerError } from "routing-controllers";
import { Service } from "typedi";
import { AbstractController } from "./AbstractController";
import { OperationRepository } from "../repositories/OperationRepository";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";
import { OperationMockObject } from "../test/mock-objects/models/OperationMockObject";
import { ContentTypes } from "../enums/ContentTypes";
import { IOperation } from "../interfaces/IOperation";

@Service()
@JsonController()
@Controller("/operations")
export class OperationsController extends AbstractController {

	constructor(private repository: OperationRepository) {
		super();
	}

	@Get('/createrecord')
	@OnUndefined(204)
	async createRecord(): Promise<IOperation> {
		// Create a dummy Operation
		const operation = OperationMockObject.createSimpleJson();

		const promise = this.repository.save(operation);

		return await promise.then(dbQuery => {
			return dbQuery.toJSON();
		});
	}

	@Get('/helloworld')
	helloworld() {
		return 'Hello world !!!';
	}
}
