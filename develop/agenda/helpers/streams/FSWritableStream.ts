import fs = require('fs');
import { Writable, Readable } from 'stream';
import { AppSettings } from '../../../shared/helpers/app-settings/AppSettings';
import { Logger } from '../../../shared/helpers/logger/Logger'

export class FSWritableStream {

	/*** Writable ***/
	private _writeStream: Writable;
	public get writeStream(): Writable {
		return this._writeStream;
	}

	/*** Readable ***/
	private _readableStream: Readable = new Readable({
		read() { }
	});
	public get readableStream(): Readable {
		return this._readableStream;
	}

	/*** Path  ***/
	private _path: string;
	public get path(): string {
		return this._path;
	}

	constructor(filename: string) {
		this._path = `${FSWritableStream.getFullPath(filename)}`;
	}

	saveStreamOnFileSystem() {
		this._writeStream = fs.createWriteStream(this._path);
		this._readableStream.pipe(this._writeStream);
	}

	private static getFullPath(filename: string): string {
		return `${AppSettings.getFileSystemTempDir()}/${filename}`;
	}
}
