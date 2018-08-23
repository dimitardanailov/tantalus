import packer = require('zip-stream');
import fs = require ('fs');
import { join } from "path";
import { WriteStream } from 'fs';

export class TantalusZIPStream {
	
	// Constants
	private static readonly S3_TEMP_FOLDER: string = '/s3'; 

	public archive: packer;

	private _stream: WriteStream;
	private _bucket: string = ""; 
	private _files: Array<String> = [];

	constructor() {
		this.archive = new packer();

		this.initiaLizeWriteStream();
	}

	/*** Bucket ***/
	get bucket(): string {
		return this._bucket = "";
	}

	set bucket(bucket: string) {
		this._bucket = bucket;
	}
	/*** Bucket ***/

	/*** Files ***/
	get files(): Array<string> {
		return this.files;
	}

	set files(files: Array<string>) {
		this._files = files;
	}
	/*** Files ***/

	/*** Stream ***/
	get stream(): WriteStream {
		return this._stream;
	}
	/*** stream ***/

	public createEmptyStream() {
		this._stream.on('close', () => {});
		
		const archive = this.archive;
		const testDate = new Date('Jan 03 2013 14:26:38 GMT');
		
		archive.entry('string', { name: 'string.txt', date: testDate }, function(err) {
			if (err) throw err;
			archive.entry('string', { name: 'buffer.txt', date: testDate }, function(err) {
				if (err) throw err;
				archive.finalize();
			});
		});
	}

	private initiaLizeWriteStream() {
		const folder = TantalusZIPStream.getLocalTemPath();
		this._stream = fs.createWriteStream(join(folder, 'use-s3-zip.zip'));
	}

	/**
	 * Folder has a status of Gate keeper of all generated zips
	 */
	private static getLocalTemPath() {
		return join(TantalusZIPStream.getBasePath(), TantalusZIPStream.S3_TEMP_FOLDER);
	}

	private static getBasePath() {
		const regExp = new RegExp('\/server\/helpers\/aws');

		return __dirname.replace(regExp, '');
	}

}
