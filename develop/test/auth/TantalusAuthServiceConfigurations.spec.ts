import { assert } from "chai";
import { TantalusAuthServiceConfigurations } from "../../auth/TantalusAuthServiceConfigurations";

describe('TantalusAuthServiceConfigurations', () => {

	describe('getTokenEndPoint', () => {
		it('positive', () => {
			const tokenEndPoint = process.env.TANTALUS_AUTH_SERVICE_TOKEN_REST_API;

			assert.equal(tokenEndPoint, TantalusAuthServiceConfigurations.getTokenEndPoint());
		});

		it('negative', () => {
			assert.notEqual(null, TantalusAuthServiceConfigurations.getTokenEndPoint());
		});

	}); // TANTALUS_AUTH_SERVICE_TOKEN_REST_API code block

	describe('getDatabaseURIEndPoint', () => {
		it('positive', () => {
			const databaseUriEndPoint = process.env.TANTALUS_AUTH_SERVICE_DATABASE_URI_REST_API;

			assert.equal(databaseUriEndPoint, TantalusAuthServiceConfigurations.getDatabaseURIEndPoint());
		});

		it ('negative', () => {
			assert.notEqual(null, TantalusAuthServiceConfigurations.getDatabaseURIEndPoint());
		});
	}); // TANTALUS_AUTH_SERVICE_DATABASE_URI_REST_API

	describe('getMasterKeyServiceId', () => {
		it ('positive', () => {
			const serviceId = process.env.TANTALUS_AUTH_MASTER_KEY_REQUEST_SERVICE_ID;

			assert.equal(serviceId, TantalusAuthServiceConfigurations.getMasterKeyServiceId());
		});

		it ('negative', () => {
			assert.notEqual(null, TantalusAuthServiceConfigurations.getMasterKeyServiceId());
		});
	}); // TANTALUS_AUTH_MASTER_KEY_REQUEST_SERVICE_ID
});
