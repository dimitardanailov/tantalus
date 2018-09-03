import { assert } from "chai";
import { Query } from "../../models/Query";
import { QueryMockObject } from "../mock-objects/models/QueryMockObject";
import { TantalusLogger } from "../../helpers/logger/TantalusLogger";
import { QueryRepository } from "../../repositories/QueryRepository";
import { MochaDatabaseConfiguration } from "../utils/database/MochaDatabaseConfiguration";

describe('QueryRepository', () => {

	let repository: QueryRepository;

	before(done => {
		// Setup a proces env
		process.env.NODE_ENV = 'test';

		// Create a connection to database
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
		MochaDatabaseConfiguration.dropDatabaseAndCloseConnection(done);
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
	}); // save method 

});
