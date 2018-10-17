import { Service } from "typedi";
import { Query } from "../models/Query";
import { Logger } from "../helpers/logger/Logger";

@Service()
export class QueryRepository {

	getCursorToAllRecords() {
		return Query.find().limit(1000).cursor();
	}

	findOne() {
		return Promise.resolve(Query.findOne().lean());
	}

	save(query: Query): Promise<Query> {
		return Promise.resolve(query.save());
	}

	countRecords(): Promise<Query> {
		return Promise.resolve(Query.estimatedDocumentCount({}).lean());
	}
}
