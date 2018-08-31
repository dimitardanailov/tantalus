import * as mongoose from "mongoose";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";
import { TantalusDatabaseSettings } from "../helpers/database/TantalusDatabaseSettings";

const mongo = {
  uri: TantalusDatabaseSettings.getConnectionString(),
  opt: {
    useNewUrlParser: true
  }
};

mongoose.connect(mongo.uri, mongo.opt).then(() => {
	TantalusLogger.info('Connected to Database');

	return mongoose.connection;
}).catch(err => {
	TantalusLogger.debugVariable(err);
});

export { mongoose };
