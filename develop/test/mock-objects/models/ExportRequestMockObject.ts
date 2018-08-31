import { ParseQueryMockObject } from "./ParseQueryMockObject";

export class ExportRequestMockObject {

	public static APPLICATION_ID:String = "123456789";
	public static MASTER_KEY:String = "0000000000";
	
	public static getExportRequest():Object {
		return {
			"application_id": ExportRequestMockObject.APPLICATION_ID,
			"master_key": ExportRequestMockObject.MASTER_KEY,
			"query": ParseQueryMockObject.QUERY
		}
	}
}
