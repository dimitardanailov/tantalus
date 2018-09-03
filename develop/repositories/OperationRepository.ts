import { Service} from "typedi";
import { Operation } from "../models/Operation";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";

@Service()
export class OperationRepository {

	getCursorToAllRecords() {
		return Operation.find().limit(25).cursor();
	}

	findOne() {
		return Promise.resolve(Operation.findOne().lean());
	}

	save(operation: Operation): Promise<Operation> {
		return Promise.resolve(operation.save());
	}
}
