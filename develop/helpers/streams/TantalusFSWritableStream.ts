import fs = require('fs');
import zlib = require('zlib');
import { Writable, Readable } from 'stream';
import { TantalusAppSettings } from '../app-settings/TantalusAppSettings';
import { TantalusLogger } from '../logger/TantalusLogger';
import { exec } from 'child_process';

export class TantalusFSWritableStream {

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
		this._path = `${TantalusFSWritableStream.getFullPath(filename)}`;
		this._writeStream = fs.createWriteStream(this._path);

		this._readableStream
			// .pipe(zlib.createGzip())
			.pipe(this._writeStream);
		
		const zipName = `${this._path}.zip`
		exec(`zip ${zipName} ${this._path}`, () => {
			console.log('zip ...');
		});
	}

	private static getFullPath(filename: string): string {
		return `${TantalusAppSettings.getFileSystemTempDir()}/${filename}`;
	}
}
