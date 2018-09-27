import { Readable } from "stream";
import tus = require("tus-js-client");
import { Stream } from "../helpers/streams/Stream";
import { AppSettings } from "../helpers/app-settings/AppSettings";
import { Logger } from "../helpers/logger/Logger";

module.exports = () => {
	const fs = require("fs");

	console.log(__dirname);
	var path = __dirname + '/health.js';

	Logger.debugVariable(path);

	var file = fs.createReadStream(path);
	var size = fs.statSync(path).size;

	const endpoint = AppSettings.getFullMicroservicesURL() + 
	AppSettings.getTusUploadEndPoint();
	Logger.debugVariable(endpoint);

	// https://github.com/tus/tus-js-client
	// https://github.com/tus/tus-js-client/blob/master/demo/node.js
	const options = {
		endpoint: endpoint,
		resume: true,
		chunkSize: 8000,
		uploadSize: size,
		metadata: {
      filename: 'tus.js'
  	},
		onError: error => {
			Logger.info(error);
		},
		onProgress: (bytesUploaded, bytesTotal) => {
			const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);

			console.log(bytesUploaded, bytesTotal, percentage + "%")
		},
		onSuccess: function() {
			Logger.info('Upload finished:' + upload.url);
		}
	};

	// Start the upload
	const upload = new tus.Upload(file, options);
	upload.start();
};
