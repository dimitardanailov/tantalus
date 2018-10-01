export class AgendaDatabaseSettings {
	public static getConnectionString(): string {
		return process.env.AGENDA_DB_STRING || process.env.TANTALUS_AGENDA_DB_STRING || '';
	}
}
