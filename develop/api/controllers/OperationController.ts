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
import { FeatureToggle } from "../../shared/helpers/feature-toggle/FeatureToggle";
import { forEach } from "p-iteration";
import { ParseLibModuleImporter } from "../../shared/helpers/parse-server/ParseLibModuleImporter";

const transform = ParseLibModuleImporter.addModule('lib/Adapters/Storage/Mongo/MongoTransform');

@Service()
@JsonController()
@Controller("/operations")
export class OperationController extends AbstractController {

	constructor(private repository: OperationRepository) {
		super();
	}

	@Post("/create")
	@OnUndefined(HTTPResponseCodes.OnUndefined)
	async createRecord(): Promise<IOperation> {
		const operation = OperationMockObject.createSimpleJson();

		const params = [
			{
				collectionName: 'GameScore',
				query: {
					"where": { "score": "1337" }
				}
			},
			{
				collectionName: 'GameScore',
				query: {
					// To Do:
					// Error: key $all must not start with '$'
					// "where": {"arrayKey":{"$all":["123456789","123456789","123456789"]}}
				}
			}
		];

		if (FeatureToggle.transformParseQueries()) {
			// this.transformParseQueriesToMongoDB(queries);
		}

		const promise = this.repository.save(operation);
		
		Logger.info(FeatureToggle.transformParseQueries())

		return await promise.then(dbQuery => { 
			if (FeatureToggle.apiCanCreateAgendaRecords()) {
				this.defineNewBackgroundJob(dbQuery._id, params);
			}

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
		Logger.info(app);

		return 'Hello World';
	}

	public static async transformParseQueriesToMongoDB(params) {
		const transformations = [];

		await forEach(params, async (param) => {
			let className = param['className'];
			let query = param['query'];
			let mongoQuery = transform.transformWhere(className, query);

			// transformations.push()

			Logger.info(mongoQuery);
		});
	}

	private async defineNewBackgroundJob(_id: string, queries) {
		const backgroundJob = new JobHelper(
			BackgroundJobNames.FS
		);

		Logger.backgroundJobInfo(`Api wants to create a new backgroundjob: ${BackgroundJobNames.FS}`);

		const agenda = backgroundJob.getAgenda();

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
