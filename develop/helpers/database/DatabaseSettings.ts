
export class DatabaseSettings {

		public static getConnectionString() {
			const server = DatabaseSettings.getDatabaseServer();
			const database = DatabaseSettings.getDatabase();

			return `${server}/${database}`;
		}

		public static getDatabaseServer() {
			return process.env.TANTALUS_DATABASE_SERVER || '';
		}
		
		public static getDatabase() {
			return process.env.TANTALUS_DATABASE || '';
		}

}
