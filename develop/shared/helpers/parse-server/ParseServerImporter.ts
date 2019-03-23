import { Logger } from "../logger/Logger";
import fs = require('fs');
import { MongoClient } from "mongodb";
import { DatabaseSettings } from "../database/DatabaseSettings";
import { ParseLibModuleImporter } from "./ParseLibModuleImporter";

export class ParseServerImporter {

	static readonly db = 'sashido-import-export-service';
	static readonly collection = 'GameScore';

	static async insertParserMockupDatabase() {
		const jsonObjects = await ParseServerImporter.readJson();
		let object
		const records = Object.keys(jsonObjects).map(key => {			
			object = jsonObjects[key]
			if (object.date) {
				object['date'] = new Date(object['date']['$date']);
			}
			object['_created_at'] = new Date(object['_created_at']['$date']);
			object['_updated_at'] = new Date(object['_updated_at']['$date']);

			return object;
		});

		const promise = new Promise(resolve => {
			MongoClient.connect(DatabaseSettings.getConnectionString(), function(error, db) {
				if (error) throw error;
				const dbo = db.db(ParseServerImporter.db);
				const query = dbo.collection(ParseServerImporter.collection).insertMany(records);
	
				query.then(() => {
					Logger.info(`${ParseServerImporter.collection} records were inserted !!!`);
					db.close();
					resolve();
				});
			});
		});

		return promise;
	}

	static async dropParseCollection() {
		const promise = new Promise(resolve => {
			MongoClient.connect(DatabaseSettings.getConnectionString(), function(error, db) {
				if (error) throw error;
				const dbo = db.db(ParseServerImporter.db);
				const query = dbo.collection(ParseServerImporter.collection).deleteMany({});
	
				query.then(() => {
					Logger.info(`${ParseServerImporter.collection} records were dropped`);
					db.close();
					resolve();
				});
			});
		});

		return promise;
	}

	

	static async readJson(): Promise<Object> {
		const path = __dirname + '/parse-server.json';

		const promise = new Promise(resolve => {
			fs.readFile(path, 'utf8', (error, data) => {
				if (error) {
					Logger.error(error);
					throw error;
				}

				resolve(JSON.parse(data));
			});
		});

		return promise;
	}
}
