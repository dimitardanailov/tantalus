import * as mongoose from "mongoose";
import { Logger } from "../helpers/logger/Logger";
import { DatabaseSettings } from "../helpers/database/DatabaseSettings";

const mongo = {
  uri: DatabaseSettings.getConnectionString(),
  opt: {
    useNewUrlParser: true
  }
};

mongoose.connect(mongo.uri, mongo.opt).then(() => {
	Logger.info('Connected to Database');

	return mongoose.connection;
}).catch(err => {
	Logger.debugVariable(err);
});

export { mongoose };
