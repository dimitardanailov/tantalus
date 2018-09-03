import chai = require("chai");
import { expect } from "chai";
import chaiHttp = require("chai-http");
import server = require('../../server');
import { TantalusLogger } from "../../helpers/logger/TantalusLogger";
import { beforeEach } from "mocha";
import { MochaController } from "../utils/controllers/MochaController";

describe.only('OperationController', () => {

	before(done => {
		chai.use(chaiHttp);

		done();
	});

	describe('createRecord', () => {
		let request;

		beforeEach(done => {
			request = chai.request(server)
				.get('/api/operations/createrecord');

			done();
		});

		it('reponse code should be 200', done => {
			MochaController.reponseCodeShouldBe200(request, done);
		});

		it('response body has a property name', done => {
			MochaController.responseBodyShouldHaveProperty(request, done, 'name');
		});

		it('response body has a property type', done => {
			MochaController.responseBodyShouldHaveProperty(request, done, 'type');
		});
	}); // createRecord test cases
});
