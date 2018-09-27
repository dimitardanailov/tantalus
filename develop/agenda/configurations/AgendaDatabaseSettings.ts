export class AgendaDatabaseSettings {
	public static getConnectionString() {
		return process.env.TANTALUS_AGENDA_DB_STRING || '';
	}

}
