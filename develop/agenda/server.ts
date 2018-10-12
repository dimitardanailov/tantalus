import Agenda = require("agenda");
import { AgendaDatabaseSettings } from "./configurations/AgendaDatabaseSettings";
import { Logger } from "../shared/helpers/logger/Logger";
import { BackgroundJobNames } from "../shared/enums/BackgroundJobNames";
import { Health } from "./helpers/health/Health";
import { FSJob } from "./jobs/FSJob";
import { ZIPJob } from "./jobs/ZIPJob";

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

	// Job is responsible to create a file on file system
	agenda.define(BackgroundJobNames.FS, FSJob.configurations, (job, done) => {
		Logger.info('hereee ...')
		FSJob.execute(job, done);
	});

	// Job is responsible to create a zip on file system
	agenda.define(BackgroundJobNames.ZIP, ZIPJob.configurations, (job, done) => {
		ZIPJob.execute(job, done);
	});

	await agenda.start();
})();
