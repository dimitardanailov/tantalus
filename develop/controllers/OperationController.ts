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
import { SashidoApplication } from "../helpers/sashido/SashidoApplication";
import { SashidoDecorator } from "./SashidoDecorator";
import { TantalusJobHelper } from "../agenda/tus/TantalusJobHelper";
import Agenda = require("agenda");

@Service()
@JsonController()
@Controller("/operations")
export class OperationController extends AbstractController {

	public static readonly BACKGROUND_TASK_NAME = 'operation';

	constructor(private repository: OperationRepository) {
		super();
	}

	@Get('/create')
	@OnUndefined(HTTPResponseCodes.OnUndefined)
	async createRecord(): Promise<IOperation> {
		// Create a dummy Operation
		const operation = OperationMockObject.createSimpleJson();

		const promise = this.repository.save(operation);

		return await promise.then(dbQuery => {
			this.defineNewBackgroundJob(dbQuery._id);

			return dbQuery.toJSON();
		});
	}

	@Authorized()
	@Get("/auth")
	auth() {
		return 'Hello World';
	}

	@Post("/decorator")
	decorator(@SashidoDecorator({ required: true }) app: SashidoApplication) {
		// TantalusLogger.info(app);

		return 'Hello World';
	}

	private async defineNewBackgroundJob(_id: string) {

		const backgroundJob = new TantalusJobHelper(
			OperationController.BACKGROUND_TASK_NAME
		);

		const agenda = backgroundJob.getAgenda();

		const queries = [
			{
				query: 'db.users.find({})'
			},
			{
				query: 'db.articles.find({}).limit(50)'
			}
		];

		const attributes  = { _id, queries};

		await agenda.start();

		// Create two dummy tasks
		await agenda.schedule('now', OperationController.BACKGROUND_TASK_NAME, attributes);
		await agenda.schedule('1 minute', OperationController.BACKGROUND_TASK_NAME, attributes);
	}
}
