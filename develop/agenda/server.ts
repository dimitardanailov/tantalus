import Agenda = require("agenda");
import { TantalusAgendaDatabaseSettings } from "./configurations/TantalusAgendaDatabaseSettings";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";

(async () => {
	TantalusLogger.info('start ...');
 
	const agenda: Agenda = new Agenda({ 
		db: { 
			address: TantalusAgendaDatabaseSettings.getConnectionString(),
			options: {
				useNewUrlParser: true
			}
		} 
	});
	
	await agenda.start();	
	await agenda.schedule('in 20 minutes', 'send email report', {to: 'admin@example.com'});

})();
