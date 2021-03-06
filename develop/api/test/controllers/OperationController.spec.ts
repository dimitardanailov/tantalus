import chai = require("chai");
import chaiHttp = require("chai-http");
import server = require('../../server');
import { Logger } from "../../../shared/helpers/logger/Logger";
import { beforeEach } from "mocha";
import { MochaController } from "../utils/controllers/MochaController";
import { SashidoConfigOptions } from "../../helpers/sashido/SashidoConfigOptions";
import { MochaDatabaseConfiguration } from "../utils/database/MochaDatabaseConfiguration";
import { OperationController } from "../../controllers/OperationController";
import { ParseServerImporter } from "../../../shared/helpers/parse-server/ParseServerImporter";

describe.only('OperationController', () => {

	let APP_ID = SashidoConfigOptions.getApplicationId();
	let MASTER_KEY = SashidoConfigOptions.getMasterKey();
	
	before(done => {
		chai.use(chaiHttp);

		done();
	});

	before(done => {
		// Setup a proces env
		process.env.NODE_ENV = 'test';

		// Create a connection to database
		MochaDatabaseConfiguration.connectToDatabase(done);
	});

	describe('createRecord', () => {
		let request;

		beforeEach(done => {
			request = chai.request(server)
				.post('/api/operations/create');

			done();
		});

		it('reponse code should be 200', done => {
			MochaController.reponseCodeShouldBe200(request, done);
		});

		it('response body should be an object', done => {
			MochaController.reponseBodyShouldBeObject(request, done);
		});

		it('response body has a property name', done => {
			MochaController.responseBodyShouldHaveProperty(request, done, 'name');
		});

		it('response body has a property type', done => {
			MochaController.responseBodyShouldHaveProperty(request, done, 'type');
		});

		it ('response body has a property backgroundJobStatus', done => {
			MochaController.responseBodyShouldHaveProperty(request, done, 'backgroundJobStatus');
		});
	}); // createRecord test cases

	describe('decorator', () => {
		let request;

		beforeEach(done => {
			 
			request = chai.request(server)
				.post('/api/operations/decorator')
				.set('X-Application-Id', APP_ID)
				.set('X-Master-Key', MASTER_KEY);

			done();
		});

		it('reponse code should be 200', done => {
			MochaController.reponseCodeShouldBe200(request, done);
		});
	});

	describe.only('transformParseQueriesToMongoDB', () => {
		const params = [
			{
				className: ParseServerImporter.collection,
				query: {
					"where": JSON.stringify({ "score": "1337" })
				}
			},
			{
				className: ParseServerImporter.collection,
				query: {
					// To Do:
					// Error: key $all must not start with '$'
					"where": JSON.stringify({"arrayKey":{"$all":["123456789","123456789","123456789"]}})
				}
			}
		];

		before(done => {
			done();
		});

		beforeEach(async () => {
			Logger.info('-- dropParseCollection --');
			await ParseServerImporter.dropParseCollection();
		});

		beforeEach(async () => {
			Logger.info('-- insertParserMockupDatabase --');
			await ParseServerImporter.insertParserMockupDatabase();
		});

		it('Records should be equal to N', () => {
			const n = 10;
		});

		it('reponse code should be 200', () => { 
			Logger.info('reponse code should be 200');
			// const mongoQueries = OperationController.transformParseQueriesToMongoDB(params);
			// Logger.debugVariable(mongoQueries);
		});

	});
});
