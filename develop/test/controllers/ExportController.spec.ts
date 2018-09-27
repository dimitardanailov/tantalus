import chai = require("chai");
import { expect } from "chai";
import chaiHttp = require("chai-http");
import server = require('../../server');
import { Logger } from "../../helpers/logger/Logger";
import { beforeEach } from "mocha";

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
			request.end((error, response) => {
				if (error) throw error;

				expect(response).to.have.status(200);
				done();
			});
		});

		it('response body has a property applicationId', done => {
			request.end((error, response) => {
				if (error) throw error;

				response.body.should.have.property('applicationId');
				done();
			});
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
			request.end((error, response) => {
				if (error) throw error;

				expect(response).to.have.status(200);
				done();
			});
		});
	});
	/*** Hello world ***/
});
