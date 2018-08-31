import * as mongoose from "mongoose";
import { TantalusTestDatabaseSettings } from "../helpers/database/TantalusTestDatabaseSettings";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";

const mongo = {
  uri: TantalusTestDatabaseSettings.getConnectionString(),
  opt: {
    useNewUrlParser: true
  }
};

const db = mongoose.connect(mongo.uri, mongo.opt);

export { db, mongoose };
