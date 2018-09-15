import Agenda = require("agenda");
import { TantalusAgendaDatabaseSettings } from "./configurations/TantalusAgendaDatabaseSettings";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";
import { OperationController } from "../controllers/OperationController";

(async () => {
	TantalusLogger.info('Agenda Start ...');
 
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

	agenda.define(OperationController.BACKGROUND_TASK_NAME, {priority: 'high', concurrency: 10}, (job, done) => {
		example(job.attrs, done);
	});
	
	await agenda.start();
})();
