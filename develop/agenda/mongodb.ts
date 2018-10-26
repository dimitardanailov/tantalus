import { Logger } from "../shared/helpers/logger/Logger";
import { MongoHealthHelper } from "./helpers/mongo/MongoHealthHelper";

(async () => {

	Logger.info('mongodb tester');

	const clientInfo = await MongoHealthHelper.checkDatabase();
	Logger.info(clientInfo);
		
})();
