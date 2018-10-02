import Agenda = require("agenda");
import { AgendaDatabaseSettings } from "./configurations/AgendaDatabaseSettings";
import { Logger } from "../shared/helpers/logger/Logger";
import { QueryRepository } from "../shared/repositories/QueryRepository";
import { BackgroundJobNames } from "../shared/enums/BackgroundJobNames";
import { TusHelper } from "./helpers/tus/TusHelper";
import { Health } from "./helpers/health/Health";

(async () => {
	Logger.info('Agenda Start ...');
 
	const agenda: Agenda = new Agenda({ 
		db: { 
			address:                                              AgendaDatabaseSettings.getConnectionString(),
			options: {
				useNewUrlParser: true
			}
		} 
	});

	const example = async function(attrs, done) {
		// Parse queries ...
		const repository = new QueryRepository();
		const cursor = repository.getCursorToAllRecords();

		await TusHelper.exportToS3(cursor, attrs._id);

		done();
	};

	// Create temp health file
	Health.createHealthFile();

	const configurations = { priority: 'high', concurrency: 10 };
	agenda.define(BackgroundJobNames.Operation, configurations, (job, done) => {
		example(job.attrs, done);
	});
	
	await agenda.start();
})();
