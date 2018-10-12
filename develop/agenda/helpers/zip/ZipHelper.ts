import fs = require('fs');
import archiver = require('archiver');
import { Logger } from '../../../shared/helpers/logger/Logger';

export class ZipHelper {

	public static async createZipFile(path) {
		return new Promise((resolve, reject) => {
			const output = fs.createWriteStream(`${path}.zip`);

			const archive = archiver('zip', {
				zlib: { level: 9 } // Sets the compression level.
			});

			archive.on('warning', error => {
				Logger.info(error);
				reject(error);

				return;
			});

			archive.on('error', error => {
				Logger.error(error);
				reject(error);

				return;
			});

			// listen for all archive data to be written
			// 'close' event is fired only when a file descriptor is involved
			output.on('close', () => resolve(true));

			// This event is fired when the data source is drained no matter what was the data source.
			// It is not part of this library but rather from the NodeJS Stream API.
			// @see: https://nodejs.org/api/stream.html#stream_event_end
			output.on('end', () => resolve(true));

			// pipe archive data to the file
			archive.pipe(output);

			// append a file
			archive.file(path);

			// finalize the archive (ie we are done appending files but streams have to finish yet)
			// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
			archive.finalize();
		});
	}
}
