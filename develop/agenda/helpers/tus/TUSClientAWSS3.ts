import tus = require("tus-js-client");
import { Logger } from "../../../shared/helpers/logger/Logger";
import { AppSettings } from "../../../shared/helpers/app-settings/AppSettings";
import { ContentTypes } from "../../../shared/enums/ContentTypes";
import fs = require("fs");

export class TUSClientAWSS3 {

	upload(options: TUSClientAWSS3Options) {
		var file = fs.createReadStream(options.path);
		var size = fs.statSync(options.path).size;

		const endpoint = AppSettings.getFullMicroservicesURL() + 
			AppSettings.getTusUploadEndPoint();

		Logger.info(options.bucketFileName);

		// https://github.com/tus/tus-js-client
		// https://github.com/tus/tus-js-client/blob/master/demo/node.js		
		const upload = new tus.Upload(file, {
			endpoint: endpoint,
			resume: true,
			uploadSize: size,
			metadata: {
				filename: options.bucketFileName,
				filetype: options.contentType
			},
			removeFingerprintOnSuccess: options.removeFingerprintOnSuccess,
			onError: error => {
				Logger.info(error);
			},
			onProgress: (bytesUploaded, bytesTotal) => {
				const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);

				console.log(bytesUploaded, bytesTotal, percentage + "% percent")
			},
			onSuccess: () => {
				Logger.info('Upload finished:' + upload.url);
			}
		});

		upload.start();
	}
}

export class TUSClientAWSS3Options {

	public path: string;
	public bucketFileName: string;
	public contentType: ContentTypes;
	public onError: Function;
	public onProgress: Function;
	public onSuccess: Function;

	/**
	 * a boolean indicating if the fingerprint in the storage will be removed when the upload is successfully completed. 
	 * This value is false for not breaking the previous API contract, 
	 * but we strongly suggest to set it to true to avoid cluttering the storage space. 
	 * The effect is that if the same file is uploaded again, it will create an entirely new upload. 
	 * Furthermore, this option will only change behaviour if resume is set to true
	 */
	public removeFingerprintOnSuccess: Boolean = true;
}
