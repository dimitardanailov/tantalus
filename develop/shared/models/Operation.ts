import { mongoose } from "../database/config";
import { Document, Schema} from "mongoose";
import { IOperation } from '../interfaces/IOperation';
import { BackgroundJobStatuses } from "../enums/BackgroundStates";

interface IOperationModel extends IOperation, Document {

}

const OperationSchema: Schema = new Schema({
	'name': String,
	'type': String,
	'backgroundJobStatus': String,
	'createdAt': Date,
	'updatedAt': Date
});

OperationSchema.set('toObject', { getters: true });
OperationSchema.set('toJSON', { getters: true, virtuals: false });

OperationSchema.pre('save', next => {
	// Date
	const now = new Date();
	if (!this.createdAt) {
		this.createdAt = now;
		this.updatedAt = now;
	}

	// Status
	this.backgroundJobStatus = BackgroundJobStatuses.New;

	next();
});

export class Operation extends mongoose.model<IOperationModel>('Operation', OperationSchema) {

}
