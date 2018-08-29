import { Readable } from "stream";
import tus = require("tus-js-client");
import { TantalusStream } from "../helpers/streams/TantalusStream";
import { TantalusAppSettings } from "../helpers/app-settings/TantalusAppSettings";
import { TantalusLogger } from "../helpers/logger/TantalusLogger";

module.exports = () => {
	const fs = require("fs");

	console.log(__dirname);
	var path = __dirname + '/health.js';

	TantalusLogger.debugVariable(path);

	var file = fs.createReadStream(path);
	var size = fs.statSync(path).size;

	const endpoint = TantalusAppSettings.getFullMicroservicesURL() + 
	TantalusAppSettings.getTusUploadEndPoint();
	TantalusLogger.debugVariable(endpoint);

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
			TantalusLogger.info(error);
		},
		onProgress: (bytesUploaded, bytesTotal) => {
			const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);

			console.log(bytesUploaded, bytesTotal, percentage + "%")
		},
		onSuccess: function() {
			TantalusLogger.info('Upload finished:' + upload.url);
		}
	};

	// Start the upload
	const upload = new tus.Upload(file, options);
	upload.start();
};
