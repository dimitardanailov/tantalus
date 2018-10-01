export class DatabaseSettings {
		public static getConnectionString() {
			return process.env.CONNECTION_STRING || process.env.TANTALUS_CONNECTION_STRING;
		}
}
