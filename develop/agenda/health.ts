import { MongoHealthHelper } from "./helpers/mongo/MongoHealthHelper";
import { Logger } from "../shared/helpers/logger/Logger";

module.exports = (app) => {
  const router = require('express').Router();

  router.get('/', async (req, res) => {
		const clientIfo = await MongoHealthHelper.checkDatabase();
		Logger.info(clientIfo);

		res.json({status: 'UP', clientInfo: clientIfo});
  });

  app.use('/health', router);
}
