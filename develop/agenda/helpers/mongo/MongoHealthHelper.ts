import { AgendaDatabaseSettings } from "../../configurations/AgendaDatabaseSettings";
import { Logger } from "../../../shared/helpers/logger/Logger";
import { MongoClient } from "mongodb";

export class MongoHealthHelper {

	public static async checkDatabase() {
		const promise = MongoHealthHelper.openConnection();
		promise.then(() => {
			Logger.info('Health checker has connection to Mongodb');
		}).catch(err => {
			throw err;
		})
	}

	public static async openConnection(): Promise<object> {
		const connectionString = AgendaDatabaseSettings.getConnectionString();
		const options = { useNewUrlParser: true }

		return new Promise((resolve, reject) => {
			MongoClient.connect(connectionString, options, (err) => {
				if (err) reject(err);
				resolve();
			});
		});
	}
}
