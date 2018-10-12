import { Logger } from "../../shared/helpers/logger/Logger";

export class TUSJob {

	public static readonly configurations = { 
		priority: 'high', 
		concurrency: 10 
	};

	public static execute(job, done: Function) {
		Logger.info(job.attrs);

		job.disable();

		done();
	}

}
