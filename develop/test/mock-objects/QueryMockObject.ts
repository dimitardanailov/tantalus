import { Query } from "../../models/Query";
import { ExportRequestMockObject } from "./ExportRequestMockObject";
import { ParseQueryMockObject } from "./ParseQueryMockObject";

export class QueryMockObject { 
	
	public query: Query;

	constructor() {
			this.query = new Query();
			this.query.applicationId = ExportRequestMockObject.APPLICATION_ID;
			this.query.parseQuery = JSON.stringify(ParseQueryMockObject.QUERY);
	}
}
