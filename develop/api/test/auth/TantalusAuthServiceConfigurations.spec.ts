import { assert } from "chai";
import { AuthServiceConfigurations } from "../../auth/AuthServiceConfigurations";

describe('AuthServiceConfigurations', () => {

	describe('getTokenEndPoint', () => {
		it('positive', () => {
			const tokenEndPoint = process.env.TANTALUS_AUTH_SERVICE_TOKEN_REST_API;

			assert.equal(tokenEndPoint, AuthServiceConfigurations.getTokenEndPoint());
		});

		it('negative', () => {
			assert.notEqual(null, AuthServiceConfigurations.getTokenEndPoint());
		});

	}); // TANTALUS_AUTH_SERVICE_TOKEN_REST_API code block

	describe('getDatabaseURIEndPoint', () => {
		it('positive', () => {
			const databaseUriEndPoint = process.env.TANTALUS_AUTH_SERVICE_DATABASE_URI_REST_API;

			assert.equal(databaseUriEndPoint, AuthServiceConfigurations.getDatabaseURIEndPoint());
		});

		it ('negative', () => {
			assert.notEqual(null, AuthServiceConfigurations.getDatabaseURIEndPoint());
		});
	}); // TANTALUS_AUTH_SERVICE_DATABASE_URI_REST_API

	describe('getMasterKeyServiceId', () => {
		it ('positive', () => {
			const serviceId = process.env.TANTALUS_AUTH_MASTER_KEY_REQUEST_SERVICE_ID;

			assert.equal(serviceId, AuthServiceConfigurations.getMasterKeyServiceId());
		});

		it ('negative', () => {
			assert.notEqual(null, AuthServiceConfigurations.getMasterKeyServiceId());
		});
	}); // TANTALUS_AUTH_MASTER_KEY_REQUEST_SERVICE_ID
});
