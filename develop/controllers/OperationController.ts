import { JsonController, Get, Post, Param, Delete, Body, Controller, OnUndefined, InternalServerError, Authorized } from "routing-controllers";
import { Service } from "typedi";
import { AbstractController } from "./AbstractController";
import { OperationRepository } from "../repositories/OperationRepository";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";
import { OperationMockObject } from "../test/mock-objects/models/OperationMockObject";
import { ContentTypes } from "../enums/ContentTypes";
import { IOperation } from "../interfaces/IOperation";
import { HTTPResponseCodes } from "../enums/HTTPResponseCodes";
import { TantalusAuthService } from "../auth/TantalusAuthService";

@Service()
@JsonController()
@Controller("/operations")
export class OperationController extends AbstractController {

	constructor(private repository: OperationRepository) {
		super();
	}

	@Get('/createrecord')
	@OnUndefined(HTTPResponseCodes.OnUndefined)
	async createRecord(): Promise<IOperation> {
		// Create a dummy Operation
		const operation = OperationMockObject.createSimpleJson();

		const promise = this.repository.save(operation);

		return await promise.then(dbQuery => {
			return dbQuery.toJSON();
		});
	}

	@Authorized()
	@Get("/auth")
	auth() {
		//const authService = new TantalusAuthService();
		// authService.authenticateMyApp();

		return 'Hello World';
	}
}
