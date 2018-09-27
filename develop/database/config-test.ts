import * as mongoose from "mongoose";
import { TestDatabaseSettings } from "../helpers/database/TestDatabaseSettings";
import { Logger } from "../helpers/logger/Logger";

const mongo = {
  uri: TestDatabaseSettings.getConnectionString(),
  opt: {
    useNewUrlParser: true
  }
};

const db = mongoose.connect(mongo.uri, mongo.opt);

export { db, mongoose };
