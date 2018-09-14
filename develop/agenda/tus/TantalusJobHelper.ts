import Agenda = require("agenda");
import { TantalusAgendaDatabaseSettings } from "../configurations/TantalusAgendaDatabaseSettings";
import { TantalusLogger } from "../../helpers/logger/TantalusLogger";

export class TantalusJobHelper {

	private static readonly WHEN = 'every hour';

	private agenda: Agenda;
	public getAgenda(): Agenda {
		return this.agenda;
	}

	private repeat: string;
	public getRepeat(): string {
		return this.repeat;
	}
	
	private name: string;
	public getName(): string {
		return this.name;
	}

	constructor(name: string, mongodbId: string) {
		// Create a new agenda
		this.agenda = new Agenda({ 
			db: { 
				address: TantalusAgendaDatabaseSettings.getConnectionString(),
				options: {
					useNewUrlParser: true
				}
			} 
		});

		this.repeat = TantalusJobHelper.WHEN;
		this.name = `${name}-${mongodbId}`;
	}
}
