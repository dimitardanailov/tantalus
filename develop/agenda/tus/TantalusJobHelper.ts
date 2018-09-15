import Agenda = require("agenda");
import { TantalusAgendaDatabaseSettings } from "../configurations/TantalusAgendaDatabaseSettings";
import { TantalusLogger } from "../../helpers/logger/TantalusLogger";

export class TantalusJobHelper {

	private agenda: Agenda;
	public getAgenda(): Agenda {
		return this.agenda;
	}
	
	private name: string;
	public getName(): string {
		return this.name;
	}

	constructor(name: string) {
		// Create a new agenda
		this.agenda = new Agenda({ 
			db: { 
				address: TantalusAgendaDatabaseSettings.getConnectionString(),
				options: {
					useNewUrlParser: true
				}
			} 
		});

		this.name = name;
	}
}
