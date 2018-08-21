import { Service } from "typedi";
import { Query } from "../models/Query";

@Service()
export class QueryRepository {
	save(query: Query) {
		query.save();

		return query;
	}
}
