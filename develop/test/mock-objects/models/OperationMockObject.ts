import { Operation } from "../../../models/Operation";
import { ContentTypes } from "../../../enums/ContentTypes";

export class OperationMockObject { 
	
	public operation: Operation;

	constructor() {
		this.operation = new Operation();
	}

	public static createSimpleJson(): Operation {
		const mockObject = new OperationMockObject();
		mockObject.operation.name = 'Tantalus JSON export Operation';
		mockObject.operation.type = ContentTypes.JSON;

		return mockObject.operation;
	}

	public static createSimpleCSV(): Operation {
		const mockObject = new OperationMockObject();
		mockObject.operation.name = 'Tantalus CSV export Operation';
		mockObject.operation.type = ContentTypes.CSV;

		return mockObject.operation;
	}
}
