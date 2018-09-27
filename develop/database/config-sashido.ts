import * as mongoose from "mongoose";
import { Logger } from "../helpers/logger/Logger";

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
			Logger.info('Connected to Remote Sashido Database');
		
			return mongoose.connection;
		}).catch(err => {
			Logger.debugVariable(err);
		});
	}

	public static connect(uri: string) {
		const instance = new SashidoDbConnector(uri);
		instance.openMongoDBConnection();
		
		return instance;
	}
}
