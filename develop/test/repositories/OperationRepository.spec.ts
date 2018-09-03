import { assert } from "chai";
import { Operation } from "../../models/Operation";
import { OperationMockObject } from "../mock-objects/models/OperationMockObject";
import { TantalusLogger } from "../../helpers/logger/TantalusLogger";
import { OperationRepository } from "../../repositories/OperationRepository";
import { MochaDatabaseConfiguration } from "../utils/database/MochaDatabaseConfiguration";

describe('OperationRepository', () => {

	let repository: OperationRepository;

	before(done => {
		// Setup a proces env
		process.env.NODE_ENV = 'test';

		// Create a connection to database
		MochaDatabaseConfiguration.connectToDatabase(done);
	});

	beforeEach(() => {
    repository = new OperationRepository();
	});
	
	afterEach(done => {
		// Clean databaase
		MochaDatabaseConfiguration.dropCollection(done, 'operations');
	});
	
	// After all tests are finished drop database and close connection
	after(done => {
		TantalusLogger.info('OperationRepository.after');
		TantalusLogger.info(done);

		MochaDatabaseConfiguration.dropDatabase(done);
	});

	/*** JSON ***/
	describe('json', () => {
		describe('save', async () => {
			let operation: Operation;

			beforeEach(done => {
				operation = OperationMockObject.createSimpleJson();
				
				done();
			});

			it('positive', async () => {
				const promise = await repository.save(operation);

				assert.equal(operation, promise);
			});

			it('negative', async () => {
				const promise = await repository.save(operation);

				assert.notEqual(null, promise);
			});
		}); // save method 
	}); // JSON test cases 

	/*** CSV ***/
	describe('csv', () => { 
		describe('save', async () => {
			let operation: Operation;

			beforeEach(done => {
				operation = OperationMockObject.createSimpleCSV();
				
				done();
			});

			it('positive', async () => {
				const promise = await repository.save(operation);

				assert.equal(operation, promise);
			});

			it('negative', async () => {
				const promise = await repository.save(operation);

				assert.notEqual(null, promise);
			});
		}); // save method
	}); // CSV test cases

});
