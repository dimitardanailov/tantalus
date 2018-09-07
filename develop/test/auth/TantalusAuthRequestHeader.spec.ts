import { assert } from "chai";
import { TantalusAuthRequestHeader } from "../../auth/TantalusAuthRequestHeader";
import { TantalusAuthRequestHeaderMockObject } from "../mock-objects/actions/TantalusAuthRequestHeaderMockObject";

describe('TantalusAuthRequestHeader', () => {

	describe('constructor', () => {

		let mockObject: TantalusAuthRequestHeader;
		let simpleHeaders;

		before(done => {
			mockObject = TantalusAuthRequestHeaderMockObject.getHeader();
			simpleHeaders = TantalusAuthRequestHeaderMockObject.getHeaderAttributes();

			done();
		});

		describe('applicationId', () => {
			let header: TantalusAuthRequestHeader;
			beforeEach(done => {
				header = new TantalusAuthRequestHeader(simpleHeaders);
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
			let header: TantalusAuthRequestHeader;

			beforeEach(done => {
				header = new TantalusAuthRequestHeader(simpleHeaders);
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
