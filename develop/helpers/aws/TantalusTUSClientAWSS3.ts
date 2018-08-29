import tus = require("tus-js-client");
import { TantalusLogger } from "../logger/TantalusLogger";
import { TantalusAppSettings } from "../app-settings/TantalusAppSettings";
import { Stream } from "stream";
import { ContentTypes } from "../../enums/ContentTypes";
import fs = require("fs");

export class TantalusTUSClientAWSS3 {

	upload(path: string, bucketFileName: string) {
		var file = fs.createReadStream(path);
		var size = fs.statSync(path).size;

		const endpoint = TantalusAppSettings.getFullMicroservicesURL() + TantalusAppSettings.getTusUploadEndPoint();

		TantalusLogger.info(bucketFileName);

		// https://github.com/tus/tus-js-client
		// https://github.com/tus/tus-js-client/blob/master/demo/node.js
		const options = {
			endpoint: endpoint,
			resume: true,
			uploadSize: size,
			metadata: {
				filename: bucketFileName
			},
			onError: error => {
				TantalusLogger.info(error);
			},
			onProgress: (bytesUploaded, bytesTotal) => {
				const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);

				console.log(bytesUploaded, bytesTotal, percentage + "% percent")
			},
			onSuccess: function() {
				TantalusLogger.info('Upload finished:' + upload.url);
			}
		};
		
		const upload = new tus.Upload(file, options);
		upload.start();
	}
}
