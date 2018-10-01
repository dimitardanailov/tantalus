import { assert } from "chai";
import { AuthServiceConfigurations } from "../../auth/AuthServiceConfigurations";

describe('AuthServiceConfigurations', () => {

	describe('getTokenEndPoint', () => {
		it('positive', () => {
			const tokenEndPoint = process.env.AUTH_SERVICE_TOKEN_REST_API || 
				process.env.TANTALUS_AUTH_SERVICE_TOKEN_REST_API;

			assert.equal(tokenEndPoint, AuthServiceConfigurations.getTokenEndPoint());
		});

		it('negative', () => {
			assert.notEqual(null, AuthServiceConfigurations.getTokenEndPoint());
		});

	}); // getTokenEndPoint

	describe('getDatabaseURIEndPoint', () => {
		it('positive', () => {
			const databaseUriEndPoint = process.env.AUTH_SERVICE_DATABASE_URI_REST_API || 
				process.env.TANTALUS_AUTH_SERVICE_DATABASE_URI_REST_API;

			assert.equal(databaseUriEndPoint, AuthServiceConfigurations.getDatabaseURIEndPoint());
		});

		it ('negative', () => {
			assert.notEqual(null, AuthServiceConfigurations.getDatabaseURIEndPoint());
		});
	}); // getDatabaseURIEndPoint 

	describe('getMasterKeyServiceId', () => {
		it ('positive', () => {
			const serviceId = process.env.AUTH_MASTER_KEY_REQUEST_SERVICE_ID || 
				process.env.TANTALUS_AUTH_MASTER_KEY_REQUEST_SERVICE_ID;

			assert.equal(serviceId, AuthServiceConfigurations.getMasterKeyServiceId());
		});

		it ('negative', () => {
			assert.notEqual(null, AuthServiceConfigurations.getMasterKeyServiceId());
		});
	}); // getMasterKeyServiceId
});
