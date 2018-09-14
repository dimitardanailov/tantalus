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

	const example = function(attrs, done) {
		console.log(attrs);

		done();
	};

	agenda.define('parse-query', {priority: 'high', concurrency: 10}, (job, done) => {
		example(job.attrs, done);
	});
	
	await agenda.start();	
	await agenda.schedule('in 20 minutes', 'send email report', {to: 'admin@example.com'});

})();
