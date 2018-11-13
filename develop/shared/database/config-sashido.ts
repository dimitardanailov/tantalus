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
		this.configurations.uri = 'mongodb://localhost:27017/dev'

		mongoose.connect(this.configurations.uri, this.configurations.opt).then(() => {
			Logger.sashidoConnectorMessage('Application has a connection to Sashido Database');
		
			return mongoose.connection;
		}).catch(err => {
			Logger.debugVariable(err);
		});
	}

	public static connect(uri: string) {
		Logger.sashidoConnectorMessage('Mongodb bridge between tantalus and SashiDo.io ... ')
		const instance = new SashidoDbConnector(uri);
		instance.openMongoDBConnection();
		
		return instance;
	}
}

// End of SashidoDbConnector
