import { 
	JsonController, Get, Post, Param, Delete, Body, 
	Controller, 
	OnUndefined, 
	InternalServerError, 
	Authorized 
} from "routing-controllers";
import { Service } from "typedi";
import { AbstractController } from "./AbstractController";
import { OperationRepository } from "../../shared/repositories/OperationRepository";
import { Logger } from "../../shared/helpers/logger/Logger";
import { ContentTypes } from "../../shared/enums/ContentTypes";
import { IOperation } from "../../shared/interfaces/IOperation";
import { HTTPResponseCodes } from "../enums/HTTPResponseCodes";
import { AuthService } from "../auth/AuthService";
import { SashidoApplication } from "../helpers/sashido/SashidoApplication";
import { SashidoDecorator } from "./SashidoDecorator";
import { JobHelper } from "../../agenda/tus/JobHelper";
import { BackgroundJobNames } from "../../shared/enums/BackgroundJobNames";
import { OperationMockObject } from "../../shared/test/mock-objects/models/OperationMockObject";
import { BackgroundJobWhen } from "../../shared/enums/BackgroundJobWhen";

@Service()
@JsonController()
@Controller("/operations")
export class OperationController extends AbstractController {

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
		// Logger.info(app);

		return 'Hello World';
	}

	private async defineNewBackgroundJob(_id: string) {

		const backgroundJob = new JobHelper(
			BackgroundJobNames.FS
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

		// Create job responsible to create a file ... 
		await agenda.schedule(
			BackgroundJobWhen.FS, 
			BackgroundJobNames.FS, 
			attributes
		);
	}
}
