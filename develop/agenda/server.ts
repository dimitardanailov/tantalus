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
			address: AgendaDatabaseSettings.getConnectionString(),
			options: {
				useNewUrlParser: true
			}
		} 
	});

	const example = async function(job, done) {
		// Parse queries ...
		const repository = new QueryRepository();
		const cursor = repository.getCursorToAllRecords();

		const output = await TusHelper.exportToS3(cursor, job.attrs._id);

		Logger.info(output);

		if (output) {
			Logger.info('Operations are exported on Amazon s3');
			job.disable();
		}
		
		done();
	};

	// Create temp health file
	Health.createHealthFile();

	const configurations = { priority: 'high', concurrency: 10 };
	agenda.define(BackgroundJobNames.Operation, configurations, (job, done) => {
		example(job, done);
	});
	
	await agenda.start();
})();
