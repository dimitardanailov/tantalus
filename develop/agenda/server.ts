import Agenda = require("agenda");
import { AgendaDatabaseSettings } from "./configurations/AgendaDatabaseSettings";
import { Logger } from "../helpers/logger/Logger";
import { OperationController } from "../controllers/OperationController";
import { QueryRepository } from "../repositories/QueryRepository";
import { TusHelper } from "../helpers/tus/TusHelper";

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

	const configurations = { priority: 'high', concurrency: 10 };

	agenda.define(OperationController.BACKGROUND_TASK_NAME, configurations, (job, done) => {
		example(job.attrs, done);
	});
	
	await agenda.start();
})();
