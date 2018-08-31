import { assert } from "chai";
import { IQuery } from "../../interfaces/IQuery";
import { Query } from "../../models/Query";
import { QueryMockObject } from "../mock-objects/QueryMockObject";
import { TantalusLogger } from "../../helpers/logger/TantalusLogger";
import { QueryRepository } from "../../repositories/QueryRepository";
import { MochaDatabaseConfiguration } from "../database/MochaDatabaseConfiguration";

describe.only('QueryRepository', () => {

	let repository: QueryRepository;

	// Create a connection to database
	before(done => {
		MochaDatabaseConfiguration.connectToDatabase(done);
	});

	beforeEach(() => {
    repository = new QueryRepository();
	});
	
	afterEach(done => {
		// Clean databaase
		MochaDatabaseConfiguration.dropCollection(done, 'queries');
	});
	
	// After all tests are finished drop database and close connection
	after(done => {
		MochaDatabaseConfiguration.dropDatabase(done);
	});

	describe('save', () => {
		it('positive', async () => {
			const mockObject = new QueryMockObject();
			const query: Query = mockObject.query;
			const promise = await repository.save(query);

			assert.equal(query, promise);
		});

		it('negative', async () => {
			const mockObject = new QueryMockObject();
			const query: Query = mockObject.query;
			const promise = await repository.save(query);

			assert.notEqual(null, promise);
		});
	});

});
