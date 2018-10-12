import Agenda = require("agenda");
import { AgendaDatabaseSettings } from "./configurations/AgendaDatabaseSettings";
import { Logger } from "../shared/helpers/logger/Logger";
import { BackgroundJobNames } from "../shared/enums/BackgroundJobNames";
import { Health } from "./helpers/health/Health";
import { FSJob } from "./jobs/FSJob";

(async () => {
	Logger.info('Agenda Start ...');
 
	const agenda: Agenda = new Agenda({ 
		db: { 
			address: AgendaDatabaseSettings.getConnectionString(),
			options: {
				useNewUrlParser: true
			}
		} 
	});

	// Create temp health file
	Health.createHealthFile();

	const configurations = { priority: 'high', concurrency: 10 };
	agenda.define(BackgroundJobNames.Operation, configurations, (job, done) => {
		FSJob.setup(job, done);
	});
	
	await agenda.start();
})();
