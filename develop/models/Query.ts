
import { Document, Schema, Model, model} from "mongoose";
import { IQuery } from '../interfaces/IQuery';

interface IQueryModel extends IQuery, Document {
  
}

const QuerySchema: Schema = new Schema({
	'applicationId': String,
	'parseQuery': String,
	'progress': {
		'type': String,
		'percent': Number
	},
	'createdAt': Date,
	'updatedAt': Date
});

QuerySchema.pre('save', (next) => {
	const now = new Date();
	if (!this.createdAt) {
		this.createdAt = now;
		this.updatedAt = now;
	}
	next();
});

export class Query extends model<IQueryModel>('Query', QuerySchema) {

}
