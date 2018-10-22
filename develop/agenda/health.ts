import { MongoHealthHelper } from "./helpers/mongo/MongoHealthHelper";

module.exports = (app) => {
  const router = require('express').Router();

  router.get('/', async (req, res) => {
		// await MongoHealthHelper.checkDatabase();
		res.json({status: 'UP'});
  });

  app.use('/health', router);
}
