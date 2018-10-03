import { 
	JsonController, 
	Get, Post, Param, Delete, Body, 
	Controller, 
	OnUndefined, 
	InternalServerError 
} from "routing-controllers";
import { Service } from "typedi";
import { QueryController } from './QueryController';
import { QueryRepository } from "../../shared/repositories/QueryRepository";
import { Logger } from "../../shared/helpers/logger/Logger";
import { IQuery } from "../../shared/interfaces/IQuery";
import { QueryMockObject } from "../../shared/test/mock-objects/models/QueryMockObject";

@Service()
@JsonController()
@Controller("/exports")
export class ExportController extends QueryController {

	constructor(private repository: QueryRepository) {
		super();
	}

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
