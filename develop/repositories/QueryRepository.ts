import { Service } from "typedi";
import { Query } from "../models/Query";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";

@Service()
export class QueryRepository {

	getCursorToAllRecords() {
		return Query.find().cursor();
	}

	findOne() {
		return Promise.resolve(Query.findOne().lean());
	}

	save(query: Query): Promise<Query> {
		return Promise.resolve(query.save());
	}
}
