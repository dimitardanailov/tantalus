import { MongoHealthHelper } from "./helpers/mongo/MongoHealthHelper";

module.exports = (app) => {
  const router = require('express').Router();

  router.get('/', async (req, res) => {
		const connectionIsValid = await MongoHealthHelper.checkDatabase();

		if (connectionIsValid) {
			res.json({status: 'UP'});
		} else {
			res.status(500).send('Database connection is broken !!!');
		}
  });

  app.use('/health', router);
}
