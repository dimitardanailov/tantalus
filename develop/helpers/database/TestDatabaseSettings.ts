
export class TestDatabaseSettings { 

	public static getConnectionString() {
		const server = TestDatabaseSettings.getDatabaseServer();
		const database = TestDatabaseSettings.getDatabase();

		return `${server}/${database}`;
	}

	public static getDatabaseServer() {
		return process.env.TANTALUS_TESTING_DATABASE_SERVER || '';
	}

	public static getDatabase() {
		return process.env.TANTALUS_TESTING_DATABASE || '';
	}
}
