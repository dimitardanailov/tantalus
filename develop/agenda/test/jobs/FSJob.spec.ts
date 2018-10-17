import { MochaDatabaseConfiguration } from "../../../api/test/utils/database/MochaDatabaseConfiguration";
import { JobSpecDBHelper } from "./DBHelper";
import { expect, assert } from "chai";
import { FSJob } from "../../jobs/FSJob";
import { QueryMockObject } from "../../../shared/test/mock-objects/models/QueryMockObject";
import { MockHelper } from "./MockHelper";
import { Logger } from "../../../shared/helpers/logger/Logger";

describe('FSJob', () => {

	require('chai').use(require('chai-fs'));

	const helper = new JobSpecDBHelper();
	const operationId = '123';
	const path = `files/${operationId}.json`;

	before(done => {
		// Setup a proces env
		process.env.NODE_ENV = 'test';

		// Create a connection to database
		MochaDatabaseConfiguration.connectToDatabase(done);
	});

	beforeEach(async () => {
		await helper.createDBRecords();
	});

	beforeEach(MockHelper.createMock);	

	afterEach(done => {
		// Clean databaase
		MochaDatabaseConfiguration.dropCollection(done, 'queries');
	});

	afterEach(MockHelper.restoreMock);

	it('count database records', async() => { 
		const count = await helper.repository.countRecords();	
		expect(count).to.equal(JobSpecDBHelper.DB_ITERATIONS);
	});
	
	describe('streamMongoDataToFS', () => {

		let cursor, promise;

		beforeEach (async () => {
			cursor = await helper.repository.getCursorToAllRecords();
			promise = await FSJob.streamMongoDataToFS(cursor, operationId);
		});

		it('streamMongoDataToFS - file exist', () => {
			expect(path).to.be.a.file();
			expect(promise).to.have.all.keys('path');
			expect(promise.path).to.be.a.file();
		});

		it('streamMongoDataToFS - file is json', () => {
			expect(promise.path).to.be.a.file().with.json;
		});

		it('streamMongoDataToFS - file has valid content', () => {
			const mockObject = new QueryMockObject();
			const regExp = new RegExp(mockObject.query.applicationId.toString());
			assert.fileContentMatch(promise.path, regExp);
		});
	});
});


