import { AgendaDatabaseSettings } from "../../configurations/AgendaDatabaseSettings";
import { Logger } from "../../../shared/helpers/logger/Logger";
import { MongoClient } from "mongodb";

export class MongoHealthHelper {

	public static async checkDatabase() {
		const client = await MongoHealthHelper.openConnection();
		
		return (client instanceof MongoClient);
	}

	public static async openConnection(): Promise<object> {
		const connectionString = AgendaDatabaseSettings.getConnectionString();		
		return new Promise((resolve, reject) => {
			MongoClient.connect(connectionString, (err, client) => {
				if (err) reject(err);
				resolve(client);
			});
		});
	}
}
