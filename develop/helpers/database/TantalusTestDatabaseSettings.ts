
export class TantalusTestDatabaseSettings { 

	public static getConnectionString() {
		const server = TantalusTestDatabaseSettings.getDatabaseServer();
		const database = TantalusTestDatabaseSettings.getDatabase();

		return `${server}/${database}`;
	}

	public static getDatabaseServer() {
		return process.env.TANTALUS_TESTING_DATABASE_SERVER || '';
	}

	public static getDatabase() {
		return process.env.TANTALUS_TESTING_DATABASE || '';
	}
}
