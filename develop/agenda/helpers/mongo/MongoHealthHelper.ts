import { AgendaDatabaseSettings } from "../../configurations/AgendaDatabaseSettings";
import { Logger } from "../../../shared/helpers/logger/Logger";
import { MongoClient } from "mongodb";
import { ErrorHandling } from "../../../shared/helpers/promises/ErrorHandling";

export class MongoHealthHelper {

	public static async checkDatabase() {
		const promise = await MongoHealthHelper.openConnection()
			.catch(ErrorHandling.throwCrash)

		Logger.info('Health checker has connection to Mongodb');
		return promise['topology']['clientInfo'];
	}

	public static async openConnection(): Promise<object> {
		const connectionString = AgendaDatabaseSettings.getConnectionString();
		const options = { useNewUrlParser: true }

		return new Promise((resolve, reject) => {
			MongoClient.connect('connectionString', options, (error, client) => {
				if (error) { 
					Logger.addPromiseError('MongoHealthHelper.openConnection', error);
					reject(error);

					return;
				}

				resolve(client);
			});
		});
	}
}
