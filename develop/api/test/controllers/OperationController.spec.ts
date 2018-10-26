import chai = require("chai");
import chaiHttp = require("chai-http");
import server = require('../../server');
import { Logger } from "../../../shared/helpers/logger/Logger";
import { beforeEach } from "mocha";
import { MochaController } from "../utils/controllers/MochaController";
import { SashidoConfigOptions } from "../../helpers/sashido/SashidoConfigOptions";

describe('OperationController', () => {

	let APP_ID = SashidoConfigOptions.getApplicationId();
	let MASTER_KEY = SashidoConfigOptions.getMasterKey();
	

	before(done => {
		chai.use(chaiHttp);

		done();
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

	describe.skip('decorator', () => {
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
});
