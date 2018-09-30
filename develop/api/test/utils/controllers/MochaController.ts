import { assert, expect } from "chai";
import { HTTPResponseCodes } from "../../../enums/HTTPResponseCodes";
import * as request from 'superagent';
import { Logger } from "../../../../shared/helpers/logger/Logger";

export class MochaController {

	public static reponseCodeShouldBe200(request: request.Request, done: Function) {
		request.end((error, response) => {
			if (error) throw error;

			expect(response).to.have.status(HTTPResponseCodes.OK);
			done();
		});
	}

	public static reponseBodyShouldBeObject(request: request.Request, done: Function) {
		request.end((error, response) => {
			if (error) throw error;

			assert.equal('object', typeof response.body);

			done();
		});
	}

	public static responseBodyShouldHaveProperty(request: request.Request, done: Function, property: string) {
		request.end((error, response) => {
			if (error) throw error;

			expect(response.body).to.have.property(property);

			done();
		});
	}
}
