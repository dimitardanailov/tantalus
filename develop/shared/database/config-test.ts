import * as mongoose from "mongoose";
import MongodbMemoryServer from 'mongodb-memory-server';
import { Logger } from "../helpers/logger/Logger";

const mongoServer = new MongodbMemoryServer();

class MemoryDatabase {

	public static async openConnection() {
		const mongoUri: string = await MemoryDatabase.getConfigurations();
		const db = mongoose.connect(mongoUri, MemoryDatabase.getMongooseOpts);

		return db;
	}

	private static async getConfigurations() {
		return new Promise<string>((resolve, reject) => {
			mongoServer.getConnectionString().then((mongoUri) => {
				if (mongoUri.length === 0) {
					reject();
				}
		
				resolve(mongoUri);
			});
		});
	}

	private static getMongooseOpts() {
		// options for mongoose 4.11.3 and above
		return { 
			autoReconnect: true,
			reconnectTries: Number.MAX_VALUE,
			reconnectInterval: 1000,
			useNewUrlParser: true
		};
	}
}

const db = MemoryDatabase.openConnection();

export { db, mongoose }
