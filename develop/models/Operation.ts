import { mongoose } from "../database/config";
import { Document, Schema} from "mongoose";
import { IOperation } from '../interfaces/IOperation';

interface IOperationModel extends IOperation, Document {

}

const OperationSchema: Schema = new Schema({
	'name': String,
	'type': String,
	'createdAt': Date,
	'updatedAt': Date
});

OperationSchema.set('toObject', { getters: true });
OperationSchema.set('toJSON', { getters: true, virtuals: false });

OperationSchema.pre('save', next => {
	const now = new Date();
	if (!this.createdAt) {
		this.createdAt = now;
		this.updatedAt = now;
	}
	next();
});

export class Operation extends mongoose.model<IOperationModel>('Operation', OperationSchema) {

}
