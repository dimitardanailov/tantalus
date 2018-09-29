import Agenda = require("agenda");
import { AgendaDatabaseSettings } from "../configurations/AgendaDatabaseSettings";

export class JobHelper {

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
				address: AgendaDatabaseSettings.getConnectionString(),
				options: {
					useNewUrlParser: true
				}
			} 
		});

		this.name = name;
	}
}
