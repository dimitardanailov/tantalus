import { JobSpecDBHelper } from "./DBHelper";
import { MochaDatabaseConfiguration } from "../../../api/test/utils/database/MochaDatabaseConfiguration";
import { MockHelper } from "./MockHelper";
import { expect, assert } from "chai";
import Agenda = require("agenda");
import { Logger } from "../../../shared/helpers/logger/Logger";
import { ZIPJob } from "../../jobs/ZIPJob";

describe.only('ZIPJob', () => {
	require('chai').use(require('chai-fs'));

	const helper = new JobSpecDBHelper();
	const operationId = 'file';
	const path = `files/${operationId}`;
	const zipFile = `${path}.zip`;

	before(done => {
		// Setup a proces env
		process.env.NODE_ENV = 'test';

		// Create a connection to database
		MochaDatabaseConfiguration.connectToDatabase(done);
	});

	beforeEach(async () => {
		await helper.createDBRecords();
	});

	beforeEach(done => {
		MockHelper.createMockAndFiles({
			file: Buffer.from('content ...')
		});

		done();
	});	

	afterEach(done => {
		// Clean databaase
		MochaDatabaseConfiguration.dropCollection(done, 'queries');
	});

	afterEach(MockHelper.restoreMock);

	it('count database records', async() => { 
		const count = await helper.repository.countRecords();	
		expect(count).to.equal(JobSpecDBHelper.DB_ITERATIONS);
	});

	describe('execute', () => {
		const job: Agenda.JobAttributesData = {
			name: ZIPJob.jobNameTest,
			attrs: {
				data: {
					path: path
				}
			},
			isDisable: false,
			disable: function() {
				this.isDisable = true;
			}
		};

		const mockFunction = function() {
		};

		beforeEach (async () => {
			await ZIPJob.execute(job, mockFunction);
		});

		it('zip file is existing', () => { 
			expect(zipFile).to.be.a.file();
		});

		it ('original should be deleted', () => {
			expect(path).to.not.be.a.path();
		});
	});
});
