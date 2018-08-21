import * as mongoose from "mongoose";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";
const localConfig = require('../config/local.json');

mongoose.connect(`mongodb://127.0.0.1:27017/${localConfig.mongodb.collection}`).then(() => {
	TantalusLogger.info('Connected to Database');
}).catch(err => {
	TantalusLogger.debugVariable(err);
});

export { mongoose };
