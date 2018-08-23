import { Service } from "typedi";
import { Query } from "../models/Query";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";

@Service()
export class QueryRepository {

	stream() {
		// Create an empty file (CSV or JSON)
		const cursor = Query.find().cursor();
		cursor.on('data', function(doc) {
			TantalusLogger.debugVariable(doc);
		});
		cursor.on('close', function() {
			// Called when done
		});
	}

	findOne() {
		return Promise.resolve(Query.findOne().lean());
	}

	save(query: Query): Promise<Query> {
		return Promise.resolve(query.save());
	}
}
