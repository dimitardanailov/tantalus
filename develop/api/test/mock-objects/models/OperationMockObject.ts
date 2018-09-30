import { Operation } from "../../../../shared/models/Operation";
import { ContentTypes } from "../../../../shared/enums/ContentTypes";
import { BackgroundJobStatuses } from "../../../../shared/enums/BackgroundStates";

export class OperationMockObject { 
	
	public operation: Operation;

	constructor() {
		this.operation = new Operation();
	}

	public static createSimpleJson(): Operation {
		const mockObject = new OperationMockObject();
		mockObject.operation.name = ' JSON export Operation';
		mockObject.operation.type = ContentTypes.JSON;
		mockObject.operation.backgroundJobStatus = BackgroundJobStatuses.New;

		return mockObject.operation;
	}

	public static createSimpleCSV(): Operation {
		const mockObject = new OperationMockObject();
		mockObject.operation.name = ' CSV export Operation';
		mockObject.operation.type = ContentTypes.CSV;
		mockObject.operation.backgroundJobStatus = BackgroundJobStatuses.New;

		return mockObject.operation;
	}
}
