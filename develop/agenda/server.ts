import Agenda = require("agenda");
import { TantalusAgendaDatabaseSettings } from "./configurations/TantalusAgendaDatabaseSettings";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";
import { OperationController } from "../controllers/OperationController";
import { QueryRepository } from "../repositories/QueryRepository";
import { TantalusTusHelper } from "../helpers/tus/TantalusTusHelper";

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

	const example = async function(attrs, done) {
		// Parse queries ...
		const repository = new QueryRepository();
		const cursor = repository.getCursorToAllRecords();

		await TantalusTusHelper.exportToS3(cursor, attrs._id);

		done();
	};

	agenda.define(OperationController.BACKGROUND_TASK_NAME, {priority: 'high', concurrency: 10}, (job, done) => {
		example(job.attrs, done);
	});
	
	await agenda.start();
})();
