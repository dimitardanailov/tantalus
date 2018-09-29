import { assert } from "chai";
import { AuthRequestHeader } from "../../auth/AuthRequestHeader";
import { AuthRequestHeaderMockObject } from "../mock-objects/actions/AuthRequestHeaderMockObject";

describe('AuthRequestHeader', () => {

	describe('constructor', () => {

		let mockObject: AuthRequestHeader;
		let simpleHeaders;

		before(done => {
			mockObject = AuthRequestHeaderMockObject.getHeader();
			simpleHeaders = AuthRequestHeaderMockObject.getHeaderAttributes();

			done();
		});

		describe('applicationId', () => {
			let header: AuthRequestHeader;
			beforeEach(done => {
				header = new AuthRequestHeader(simpleHeaders);
				done();
			});

			it('positive', () => {
				assert.equal(mockObject.applicationId, header.applicationId);
			});

			it('negative', () => {
				assert.notEqual(null, header.applicationId);
			});
		}); // applicationId

		describe('masterKey', () => {
			let header: AuthRequestHeader;

			beforeEach(done => {
				header = new AuthRequestHeader(simpleHeaders);
				done();
			});

			it('positive', () => {
				assert.equal(mockObject.masterKey, header.masterKey);
			});

			it('negative', () => {
				assert.notEqual(null, header.masterKey);
			});
		}); // masterKey
	});
});
