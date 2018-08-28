import tus = require("tus-js-client");
import { TantalusLogger } from "../logger/TantalusLogger";
import { TantalusAppSettings } from "../app-settings/TantalusAppSettings";
import { Stream } from "stream";
import { ContentTypes } from "../../enums/ContentTypes";

export class TantalusTUSClientAWSS3 {

	upload(filename: string) {
		const fs = require("fs");
		var path = __dirname + '/TantalusAWSS3.js';
		var file = fs.createReadStream(path);
		var size = fs.statSync(path).size;

		const pass = new Stream.PassThrough();

		const endpoint = TantalusAppSettings.getFullMicroservicesURL() + TantalusAppSettings.getTusUploadEndPoint();

		// https://github.com/tus/tus-js-client
		// https://github.com/tus/tus-js-client/blob/master/demo/node.js
		const options = {
			endpoint: endpoint,
			resume: true,
			uploadSize: size,
			metadata: {
				filename: filename,
				filetype: ContentTypes.JSON
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

		// Start the upload
		const upload = new tus.Upload(file, options);
		upload.start();

		return pass;
	}
}
