import chai = require("chai");
import { expect } from "chai";
import chaiHttp = require("chai-http");
import server = require('../../server');
import { Logger } from "../../../shared/helpers/logger/Logger";
import { beforeEach } from "mocha";
import { MochaController } from "../utils/controllers/MochaController";

describe('ExportController', () => {

	before(done => {
		chai.use(chaiHttp);

		done();
	});

	describe('createRecord', () => {
		let request;

		beforeEach(done => {
			request = chai.request(server)
				.get('/api/exports/createrecord');

			done();
		});

		it('reponse code should be 200', done => {
			MochaController.reponseCodeShouldBe200(request, done);
		});

		it('response body has a property applicationId', done => {
			MochaController.responseBodyShouldHaveProperty(request, done, 'applicationId');
		});
	});
	/*** Create a record ***/

	describe("helloworld", () => {
		let request;

		beforeEach(done => {
			request = chai.request(server)
				.get('/api/exports/helloworld');

			done();
		});

		it('reponse code should be 200', done => {
			MochaController.reponseCodeShouldBe200(request, done);
		});
	});
	/*** Hello world ***/
});
