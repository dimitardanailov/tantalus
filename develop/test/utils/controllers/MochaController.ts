import { expect } from "chai";
import { HTTPResponseCodes } from "../../../enums/HTTPResponseCodes";
import * as request from 'superagent';

export class MochaController {

	public static reponseCodeShouldBe200(request: request.Request, done: Function) {
		request.end((error, response) => {
			if (error) throw error;

			expect(response).to.have.status(HTTPResponseCodes.OK);
			done();
		});
	}

	public static responseBodyShouldHaveProperty(request: request.Request, done: Function, property: string) {
		request.end((error, response) => {
			if (error) throw error;

			response.body.should.have.property(property);
			done();
		});
	}
}
