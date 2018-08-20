import { Service } from "typedi";
import { Query } from "../models/Query";

@Service()
export class QueryRepository {
	save(query: Query) {
		console.log(Query);
		console.log(query);
	}
}
