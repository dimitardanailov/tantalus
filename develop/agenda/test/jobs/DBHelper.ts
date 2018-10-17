import { QueryRepository } from "../../../shared/repositories/QueryRepository";
import { QueryMockObject } from "../../../shared/test/mock-objects/models/QueryMockObject";
import { Logger } from "../../../shared/helpers/logger/Logger";

export class JobSpecDBHelper {

	private _repository: QueryRepository;
	public get repository(): QueryRepository {
		return this._repository;
	}
	public static DB_ITERATIONS = 100;

	constructor() {
		this._repository = new QueryRepository();
	}

	public async createDBRecords() {
		let results = []
		for(let i = 0; i < JobSpecDBHelper.DB_ITERATIONS; i++) {
			results.push(await this.createDummyRecord());
		}

		return Promise.all(results);
	}

	private createDummyRecord() {
		// Create a dummy Query
		const mockObject = new QueryMockObject();
		
		const promise = this._repository.save(mockObject.query);

		return promise;
	}
}
