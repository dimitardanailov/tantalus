import { Service } from "typedi";
import { Query } from "../models/Query";

@Service()
export class QueryRepository {

	findOne() {
		return Promise.resolve(Query.findOne().lean());
	}

	save(query: Query): Promise<Query> {
		return Promise.resolve(query.save());
	}
}
