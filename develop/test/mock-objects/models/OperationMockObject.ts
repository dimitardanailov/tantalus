import { Operation } from "../../../models/Operation";
import { ContentTypes } from "../../../enums/ContentTypes";
import { BackgroundJobStatuses } from "../../../enums/BackgroundStates";

export class OperationMockObject { 
	
	public operation: Operation;

	constructor() {
		this.operation = new Operation();
	}

	public static createSimpleJson(): Operation {
		const mockObject = new OperationMockObject();
		mockObject.operation.name = 'Tantalus JSON export Operation';
		mockObject.operation.type = ContentTypes.JSON;
		mockObject.operation.backgroundJobStatus = BackgroundJobStatuses.New;

		return mockObject.operation;
	}

	public static createSimpleCSV(): Operation {
		const mockObject = new OperationMockObject();
		mockObject.operation.name = 'Tantalus CSV export Operation';
		mockObject.operation.type = ContentTypes.CSV;
		mockObject.operation.backgroundJobStatus = BackgroundJobStatuses.New;

		return mockObject.operation;
	}
}
