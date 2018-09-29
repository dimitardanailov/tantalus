import { ContentTypes } from "../enums/ContentTypes";
import { BackgroundJobStatuses } from "../enums/BackgroundStates";

export interface IOperation {
	name: string,
	type: ContentTypes,
	backgroundJobStatus: BackgroundJobStatuses
}
