
export class TantalusDatabaseSettings {

		public static getConnectionString() {
			const server = TantalusDatabaseSettings.getDatabaseServer();
			const database = TantalusDatabaseSettings.getDatabase();

			return `${server}/${database}`;
		}

		public static getDatabaseServer() {
			return process.env.TANTALUS_DATABASE_SERVER || '';
		}
		
		public static getDatabase() {
			return process.env.TANTALUS_DATABASE || '';
		}

}
