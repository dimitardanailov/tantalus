import * as mongoose from "mongoose";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";

export class SashidoDbConnector {
	private configurations = {
		uri: "",
		opt: {
			useNewUrlParser: true
		}
	}

	constructor(uri: string) {
		this.configurations.uri = uri;
	}

	public db;
	public mongoose;

	openMongoDBConnection() {
		mongoose.connect(this.configurations.uri, this.configurations.opt).then(() => {
			TantalusLogger.info('Connected to Remote Sashido Database');
		
			return mongoose.connection;
		}).catch(err => {
			TantalusLogger.debugVariable(err);
		});
	}

	public static connect(uri: string) {
		const instance = new SashidoDbConnector(uri);
		instance.openMongoDBConnection();
		
		return instance;
	}
}
