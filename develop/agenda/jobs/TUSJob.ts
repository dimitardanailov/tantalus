import { Logger } from "../../shared/helpers/logger/Logger";
import { 
	TUSClientAWSS3, 
	TUSClientAWSS3Options 
} from "../helpers/tus/TUSClientAWSS3";
import { ContentTypes } from "../../shared/enums/ContentTypes";

export class TUSJob {

	public static readonly configurations = { 
		priority: 'high', 
		concurrency: 10 
	};

	public static execute(job, done: Function) {
		const path = job.attrs.data.path || null;
		
		if (path === null) {
			done();

			return;
		}

		Logger.info(`Job should upload on Amazon S3: ${path}`);

		const tusClient = new TUSClientAWSS3();
		const options = new TUSClientAWSS3Options();
		options.path = path;
		options.bucketFileName = 'bucketFileName.json.zip';
		options.contentType = ContentTypes.ZIP;

		tusClient.upload(options);

		job.disable();

		done();
	}

}
