import { assert } from "chai";
import { DatabaseSettings } from "../../../helpers/database/DatabaseSettings";

describe('DatabaseSettings', () => {

	describe('getConnectionString', () => {
		it('positive', () => {
			const connectionString = DatabaseSettings.getConnectionString();
			const serverPart = connectionString.substring(0, 10);

			assert.equal('mongodb://', serverPart);
		});

		it('negative', () => {
			assert.notEqual(null, DatabaseSettings.getConnectionString());
		});
	}); // getConnectionString end point testing
});
