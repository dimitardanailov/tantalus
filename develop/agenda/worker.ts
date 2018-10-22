import Agenda = require("agenda");
import { AgendaDatabaseSettings } from "./configurations/AgendaDatabaseSettings";
import { Logger } from "../shared/helpers/logger/Logger";
import { BackgroundJobNames } from "../shared/enums/BackgroundJobNames";
import { FSJob } from "./jobs/FSJob";
import { ZIPJob } from "./jobs/ZIPJob";
import { TUSJob } from "./jobs/TUSJob";

(async () => {
	const agenda: Agenda = new Agenda({ 
		db: { 
			address: AgendaDatabaseSettings.getConnectionString(),
			options: {
				useNewUrlParser: true
			}
		} 
	});

	// Job is responsible to create a file on file system
	agenda.define(BackgroundJobNames.FS, FSJob.configurations, (job, done) => {
		FSJob.execute(job, done);
	});

	// Job is responsible to create a zip on file system
	agenda.define(BackgroundJobNames.ZIP, ZIPJob.configurations, (job, done) => {
		ZIPJob.execute(job, done);
	});

	// Job is responsible to upload data on Amazon S3
	agenda.define(BackgroundJobNames.TUS, TUSJob.configurations, (job, done) => {
		TUSJob.execute(job, done);
	});

	await agenda.start();

	Logger.info('Agenda Start ...');

	// Load load service
	loadHealthService();
})();

function loadHealthService() {
	const app = require("express")();
	const port = process.env.TANTALUS_AGENDA_HEALTH_SERVICE_PORT || 
		process.env.AGENDA_HEALTH_SERVICE_PORT || 8080;

		require('./health')(app);

	app.listen(port, () => {
		Logger.info(`Application has a health service on ${port}`);
	});
}
