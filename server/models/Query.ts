
import { Document, Schema, Model, model} from "mongoose";
import { IQuery } from '../interfaces/IQuery'

export interface IQueryModel extends IQuery, Document {
  
}

export const QuerySchema: Schema = new Schema({
	'applicationId': String,
	'parseQuery': String,
	'progress': {
		'type': String,
		'percent': Number
	}
});	

export const Query: Model<IQueryModel> = model<IQueryModel>("Query", QuerySchema);
